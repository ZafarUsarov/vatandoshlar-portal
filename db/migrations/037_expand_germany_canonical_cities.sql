BEGIN;

-- Expands the canonical German city catalogue used by the profile form.
-- Existing rows/IDs are untouched. Each city is linked to its existing Bundesland.
WITH city_seed(state_code, city_name, slug) AS (
  VALUES
    ('DE-BW','Stuttgart','stuttgart'),('DE-BW','Mannheim','mannheim'),('DE-BW','Karlsruhe','karlsruhe'),('DE-BW','Freiburg im Breisgau','freiburg-im-breisgau'),('DE-BW','Heidelberg','heidelberg'),('DE-BW','Heilbronn','heilbronn'),('DE-BW','Ulm','ulm'),('DE-BW','Pforzheim','pforzheim'),('DE-BW','Reutlingen','reutlingen'),
    ('DE-BY','München','muenchen'),('DE-BY','Nürnberg','nuernberg'),('DE-BY','Augsburg','augsburg'),('DE-BY','Regensburg','regensburg'),('DE-BY','Ingolstadt','ingolstadt'),('DE-BY','Würzburg','wuerzburg'),('DE-BY','Fürth','fuerth'),('DE-BY','Erlangen','erlangen'),('DE-BY','Bamberg','bamberg'),('DE-BY','Bayreuth','bayreuth'),
    ('DE-BE','Berlin','berlin'),
    ('DE-BB','Potsdam','potsdam'),('DE-BB','Cottbus','cottbus'),('DE-BB','Brandenburg an der Havel','brandenburg-an-der-havel'),('DE-BB','Frankfurt (Oder)','frankfurt-oder'),
    ('DE-HB','Bremen','bremen'),('DE-HB','Bremerhaven','bremerhaven'),
    ('DE-HH','Hamburg','hamburg-city'),
    ('DE-HE','Frankfurt am Main','frankfurt-am-main'),('DE-HE','Wiesbaden','wiesbaden'),('DE-HE','Kassel','kassel'),('DE-HE','Darmstadt','darmstadt'),('DE-HE','Offenbach am Main','offenbach-am-main'),('DE-HE','Hanau','hanau'),('DE-HE','Gießen','giessen'),
    ('DE-MV','Rostock','rostock'),('DE-MV','Schwerin','schwerin'),('DE-MV','Neubrandenburg','neubrandenburg'),('DE-MV','Greifswald','greifswald'),('DE-MV','Stralsund','stralsund'),
    ('DE-NI','Hannover','hannover'),('DE-NI','Braunschweig','braunschweig'),('DE-NI','Oldenburg','oldenburg'),('DE-NI','Wolfsburg','wolfsburg'),('DE-NI','Göttingen','goettingen'),('DE-NI','Hildesheim','hildesheim'),('DE-NI','Salzgitter','salzgitter'),('DE-NI','Lüneburg','lueneburg'),
    ('DE-NW','Köln','koeln'),('DE-NW','Düsseldorf','duesseldorf'),('DE-NW','Dortmund','dortmund'),('DE-NW','Duisburg','duisburg'),('DE-NW','Bochum','bochum'),('DE-NW','Wuppertal','wuppertal'),('DE-NW','Bielefeld','bielefeld'),('DE-NW','Bonn','bonn'),('DE-NW','Münster','muenster'),('DE-NW','Mönchengladbach','moenchengladbach'),('DE-NW','Gelsenkirchen','gelsenkirchen'),('DE-NW','Aachen','aachen'),('DE-NW','Krefeld','krefeld'),('DE-NW','Oberhausen','oberhausen'),('DE-NW','Hagen','hagen'),('DE-NW','Leverkusen','leverkusen'),('DE-NW','Solingen','solingen'),('DE-NW','Paderborn','paderborn'),('DE-NW','Recklinghausen','recklinghausen'),('DE-NW','Siegen','siegen'),
    ('DE-RP','Mainz','mainz'),('DE-RP','Ludwigshafen am Rhein','ludwigshafen-am-rhein'),('DE-RP','Koblenz','koblenz'),('DE-RP','Trier','trier'),('DE-RP','Kaiserslautern','kaiserslautern'),('DE-RP','Worms','worms'),
    ('DE-SL','Saarbrücken','saarbruecken'),('DE-SL','Neunkirchen','neunkirchen-saarland'),('DE-SL','Homburg','homburg-saarland'),
    ('DE-SN','Leipzig','leipzig'),('DE-SN','Dresden','dresden'),('DE-SN','Chemnitz','chemnitz'),('DE-SN','Zwickau','zwickau'),('DE-SN','Plauen','plauen'),
    ('DE-ST','Halle (Saale)','halle-saale'),('DE-ST','Magdeburg','magdeburg'),('DE-ST','Dessau-Roßlau','dessau-rosslau'),('DE-ST','Lutherstadt Wittenberg','lutherstadt-wittenberg'),
    ('DE-SH','Kiel','kiel'),('DE-SH','Lübeck','luebeck'),('DE-SH','Flensburg','flensburg'),('DE-SH','Neumünster','neumuenster'),('DE-SH','Norderstedt','norderstedt'),('DE-SH','Elmshorn','elmshorn'),
    ('DE-TH','Erfurt','erfurt'),('DE-TH','Jena','jena'),('DE-TH','Gera','gera'),('DE-TH','Weimar','weimar'),('DE-TH','Gotha','gotha'),('DE-TH','Eisenach','eisenach')
), resolved AS (
  SELECT s.id AS parent_id, s.state_code, s.state_name, c.city_name, c.slug
  FROM city_seed c
  JOIN locations s ON s.country_code='DE' AND s.location_type='state'
    AND s.state_code=c.state_code AND s.status='active'
)
INSERT INTO locations (
  country_code, location_type, state_code, state_name, city_name,
  slug, parent_id, latitude, longitude, status
)
SELECT 'DE','city',state_code,state_name,city_name,slug,parent_id,NULL,NULL,'active'
FROM resolved
ON CONFLICT DO NOTHING;

DO $$
DECLARE state_count integer;
BEGIN
  SELECT COUNT(*) INTO state_count
  FROM locations
  WHERE country_code='DE' AND location_type='state' AND status='active';
  IF state_count <> 16 THEN
    RAISE EXCEPTION 'Expected 16 active German state rows, found %', state_count;
  END IF;
END
$$;

COMMIT;
