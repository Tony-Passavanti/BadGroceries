-- Company Info

-- Find basic info about a given company (replace integer with given company's id)
SELECT *
FROM Company
WHERE company_id = 1;

-- Find tags about a given company (replace integer with given company's id)
SELECT Tag.tag_name
FROM Company_Tag
INNER JOIN Tag ON Company_Tag.tag_id = Tag.tag_id
WHERE Company_Tag.company_id = 3;

-- Company Search

-- Find a company_id from a given company's name (replace string with given company's name)
SELECT company_id
FROM Company
WHERE name = 'Sidney''s Siding';

-- Find a company_id from a given tag name (replace string with given tag's name)
SELECT company_id
FROM Company_Tag
INNER JOIN Tag ON Company_Tag.tag_id = Tag.tag_id
WHERE tag_name = 'Family Owned';

-- Parents

-- Find company_id's of a given company's parents (replace integer with given company's id)
SELECT parent
FROM Company_Parents
WHERE company_id = 1;

-- Find basic info of a given company's parents (replace integer with given company's id)
SELECT Company.*
FROM Company_Parents
INNER JOIN Company ON Company_Parents.parent = Company.company_id
WHERE Company_Parents.company_id = 1;

-- Subsidiaries

-- Find company_id's of a given company's subsidiaries (replace integer with given company's id)
SELECT company_id
FROM Company_Parents
WHERE parent = 1;

-- Find basic info of a given company's subsidiaries (replace integer with given company's id)
SELECT Company.*
FROM Company_Parents
INNER JOIN Company ON Company_Parents.company_id = Company.company_id
WHERE Company_Parents.parent = 1;