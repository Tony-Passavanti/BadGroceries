'use client';

import React, { useEffect, useState } from 'react';

interface Subsidiary {
  name: string;
}

interface ViewSubsidiaryTreeProps {
  companyName: string;
  subsidiaries: Subsidiary[];
}

const CHILD_CARD_WIDTH = 220;
const CHILD_GAP = 24;
const COLUMN_SPACING = CHILD_CARD_WIDTH + CHILD_GAP;

const getNodeCenterOffset = (index: number, total: number) => (index - (total - 1) / 2) * COLUMN_SPACING;

interface LevelData {
  parentName: string;
  subsidiaries: Subsidiary[];
  anchorOffset: number;
}

interface SupabaseSearchResult {
  name?: string;
  tags?: string;
  subsidiaries?: string[];
}

interface LoadingTarget {
  levelIndex: number;
  nodeIndex: number;
}

export default function ViewSubsidiaryTree({ companyName, subsidiaries }: ViewSubsidiaryTreeProps) {
  const [levels, setLevels] = useState<LevelData[]>(() =>
    subsidiaries.length ? [{ parentName: companyName, subsidiaries, anchorOffset: 0 }] : []
  );
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [loadingTarget, setLoadingTarget] = useState<LoadingTarget | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setLevels(subsidiaries.length ? [{ parentName: companyName, subsidiaries, anchorOffset: 0 }] : []);
    setSelectedIndices([]);
    setStatusMessage(null);
    setLoadingTarget(null);
  }, [companyName, subsidiaries]);

  const hasInitialSubsidiaries = levels.length > 0;
  const isTreeLocked = Boolean(loadingTarget);

  const handleChildClick = async (levelIndex: number, nodeIndex: number) => {
    if (loadingTarget) return;

    const parentLevel = levels[levelIndex];
    const targetNode = parentLevel?.subsidiaries?.[nodeIndex];
    if (!parentLevel || !targetNode) return;

    const parentCenter = parentLevel.anchorOffset + getNodeCenterOffset(nodeIndex, parentLevel.subsidiaries.length);

    setSelectedIndices((prev) => {
      const next = prev.slice(0, levelIndex);
      next[levelIndex] = nodeIndex;
      return next;
    });

    setLevels((prev) => prev.slice(0, levelIndex + 1));
    setLoadingTarget({ levelIndex, nodeIndex });
    setStatusMessage(null);

    try {
      const response = await fetch('/api/supasearch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: targetNode.name }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subsidiaries');
      }

      const payload = (await response.json()) as { data?: SupabaseSearchResult[]; error?: string };
      if (payload.error) {
        throw new Error(payload.error);
      }

      const matches = payload.data || [];
      const companyMatch =
        matches.find((record) => record.name?.toLowerCase() === targetNode.name.toLowerCase()) || matches[0];

      const children =
        companyMatch?.subsidiaries
          ?.filter((name): name is string => typeof name === 'string' && name.trim().length > 0)
          .map((name) => ({ name })) || [];

      if (children.length === 0) {
        setLevels((prev) => prev.slice(0, levelIndex + 1));
        setStatusMessage(`No subsidiaries found for ${targetNode.name}`);
        return;
      }

      setLevels((prev) => {
        const next = prev.slice(0, levelIndex + 1);
        next.push({
          parentName: targetNode.name,
          subsidiaries: children,
          anchorOffset: parentCenter,
        });
        return next;
      });
    } catch (error) {
      console.error('Error loading subsidiaries', error);
      setStatusMessage(`Unable to load subsidiaries for ${targetNode.name}`);
    } finally {
      setLoadingTarget(null);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 w-full">
      <div className="px-8 py-6 border-2 border-text-bright rounded-xl bg-bg-panel text-xl font-bold text-center min-w-[250px] shadow-lg text-text-bright">
        {companyName}
      </div>

      {!hasInitialSubsidiaries && (
        <div className="mt-6 p-4 text-text-secondary italic">No subsidiaries listed</div>
      )}

      {levels.map((level, index) => (
        <TreeLevel
          key={`${level.parentName}-${index}`}
          level={level}
          levelIndex={index}
          isFirstLevel={index === 0}
          selectedIndex={selectedIndices[index]}
          hasNextLevel={Boolean(levels[index + 1])}
          isTreeLocked={isTreeLocked}
          loadingTarget={loadingTarget}
          onChildClick={handleChildClick}
        />
      ))}

      {statusMessage && (
        <div className="mt-6 text-sm text-text-secondary italic text-center px-4">{statusMessage}</div>
      )}
    </div>
  );
}

interface TreeLevelProps {
  level: LevelData;
  levelIndex: number;
  isFirstLevel: boolean;
  selectedIndex?: number;
  hasNextLevel: boolean;
  isTreeLocked: boolean;
  loadingTarget: LoadingTarget | null;
  onChildClick: (levelIndex: number, nodeIndex: number) => void;
}

function TreeLevel({
  level,
  levelIndex,
  isFirstLevel,
  selectedIndex,
  hasNextLevel,
  isTreeLocked,
  loadingTarget,
  onChildClick,
}: TreeLevelProps) {
  const count = level.subsidiaries.length;
  const rowWidth = count * CHILD_CARD_WIDTH + Math.max(count - 1, 0) * CHILD_GAP;
  const horizontalLineWidth = Math.max(rowWidth - CHILD_CARD_WIDTH, 0);
  const hasMultiple = count > 1;

  if (count === 0) return null;

  return (
    <div className="w-full flex flex-col items-center overflow-visible">
      <div className="w-full overflow-visible">
        <div
          className="mx-auto flex flex-col items-center"
          style={{ width: `${rowWidth}px`, transform: `translateX(${level.anchorOffset}px)` }}
        >
          <div className={`w-[3px] bg-border ${isFirstLevel ? 'h-10' : 'h-12'}`} />

          <div className="relative w-full">
            {hasMultiple && (
              <>
                <div
                  className="absolute top-0 h-[3px] bg-border"
                  style={{
                    left: `${CHILD_CARD_WIDTH / 2}px`,
                    width: `${horizontalLineWidth}px`,
                  }}
                />

                <div
                  className="absolute top-0 left-0 right-0 grid"
                  style={{
                    gridTemplateColumns: `repeat(${count}, minmax(${CHILD_CARD_WIDTH}px, 1fr))`,
                    columnGap: `${CHILD_GAP}px`,
                  }}
                >
                  {level.subsidiaries.map((_, index) => (
                    <div key={`connector-${index}`} className="flex justify-center">
                      <div className="w-[3px] h-12 bg-border" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {!hasMultiple && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-12 bg-border" />
            )}

            <div
              className="grid justify-items-center gap-6 mt-12"
              style={{
                gridTemplateColumns: `repeat(${count}, minmax(${CHILD_CARD_WIDTH}px, ${CHILD_CARD_WIDTH}px))`,
              }}
            >
              {level.subsidiaries.map((subsidiary, index) => {
                const isLoading =
                  loadingTarget?.levelIndex === levelIndex && loadingTarget?.nodeIndex === index;
                const isActive =
                  typeof selectedIndex === 'number' && selectedIndex === index && hasNextLevel;
                const disabled = isTreeLocked || !subsidiary.name;

                return (
                  <button
                    type="button"
                    key={`subsidiary-${index}`}
                    onClick={() => onChildClick(levelIndex, index)}
                    disabled={disabled}
                    className={`px-6 py-4 border-2 rounded-lg bg-bg-panel text-sm text-center min-w-[200px] max-w-[250px] shadow-sm transition-colors ${
                      isActive ? 'border-text-bright shadow-md' : 'border-text-secondary'
                    } ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-text-bright'}`}
                  >
                    <div className="font-semibold text-text-bright">{subsidiary.name}</div>
                    {isLoading && <div className="mt-2 text-xs text-text-secondary">Loading…</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
