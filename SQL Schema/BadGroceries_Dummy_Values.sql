-- Insert Companies

INSERT INTO Company
VALUES (DEFAULT, 'Sidney''s Siding', 'A home improvement company that specializes in vinyl siding.');

INSERT INTO Company
VALUES (DEFAULT, 'Logan''s Law Firm');

INSERT INTO Company
VALUES (DEFAULT, 'Matt''s National Equity', 'An equity firm that invests in small businesses across the US.');

INSERT INTO Company
VALUES (DEFAULT, 'Tony''s Timekeepers', 'A digital and analog clock repair service.');

INSERT INTO Company
VALUES (DEFAULT, 'Isaac''s International Distributors', 'A family owned logistics company.');

INSERT INTO Company
VALUES (DEFAULT, 'Blissful Buffets', 'A family owned buffet restaurant chain with a focus on accessible menu options.');

SELECT * 
FROM Company;

-- Insert Company-Parent relationships

INSERT INTO Company_Parents
VALUES ((SELECT company_id FROM Company WHERE name = 'Sidney''s Siding'), (SELECT company_id FROM Company WHERE name = 'Logan''s Law Firm'));

INSERT INTO Company_Parents
VALUES ((SELECT company_id FROM Company WHERE name = 'Sidney''s Siding'), (SELECT company_id FROM Company WHERE name = 'Matt''s National Equity'));

INSERT INTO Company_Parents
VALUES ((SELECT company_id FROM Company WHERE name = 'Tony''s Timekeepers'), (SELECT company_id FROM Company WHERE name = 'Sidney''s Siding'));

INSERT INTO Company_Parents
VALUES ((SELECT company_id FROM Company WHERE name = 'Blissful Buffets'), (SELECT company_id FROM Company WHERE name = 'Matt''s National Equity'));

SELECT * 
FROM Company_Parents;

-- Insert Tags

INSERT INTO Tag
VALUES (DEFAULT, 'Family Owned');

INSERT INTO Tag
VALUES (DEFAULT, 'Vegan');

SELECT * 
FROM Tag;

-- Associate Tags with Companies

INSERT INTO Company_Tag
VALUES ((SELECT company_id FROM Company WHERE name = 'Logan''s Law Firm'), (SELECT tag_id FROM Tag WHERE tag_name = 'Family Owned'));

INSERT INTO Company_Tag
VALUES ((SELECT company_id FROM Company WHERE name = 'Isaac''s International Distributors'), (SELECT tag_id FROM Tag WHERE tag_name = 'Family Owned'));

INSERT INTO Company_Tag
VALUES ((SELECT company_id FROM Company WHERE name = 'Blissful Buffets'), (SELECT tag_id FROM Tag WHERE tag_name = 'Vegan'));

INSERT INTO Company_Tag
VALUES ((SELECT company_id FROM Company WHERE name = 'Blissful Buffets'), (SELECT tag_id FROM Tag WHERE tag_name = 'Family Owned'));

SELECT * 
FROM Company_Tag;