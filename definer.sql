DROP FUNCTION IF EXISTS leaflet_upsert_usercomments(int[], text[]);

-- Returns a set of op,cartodb_id values where op means:
--  deleted: -1
--  updated: 0
--  inserted: 1

CREATE OR REPLACE FUNCTION leaflet_upsert_usercomments(
  cartodb_ids integer[],
  geojsons text[])
  RETURNS TABLE(op int, cartodb_id int)

LANGUAGE plpgsql SECURITY DEFINER
RETURNS NULL ON NULL INPUT
AS $$
DECLARE
sql text;
BEGIN

sql := 'WITH n(cartodb_id,the_geom) AS (VALUES ';

-- Iterate over the values
FOR i in 1 .. array_upper(geojsons, 1)
LOOP
  IF i > 1 THEN sql := sql || ','; END IF;
  sql :=sql || '('||cartodb_ids[i]||','
            || 'ST_SetSRID(ST_GeomFromGeoJSON(NULLIF('''|| geojsons[i] ||''','''')),4326))';
END LOOP;

sql := sql || '), do_update AS ('
      || 'UPDATE leaflet_data p '
      || 'SET the_geom=n.the_geom FROM n WHERE p.cartodb_id = n.cartodb_id '
      || 'AND n.the_geom IS NOT NULL '
      || 'RETURNING p.cartodb_id ), do_delete AS ('
      || 'DELETE FROM leaflet_data p WHERE p.cartodb_id IN ('
      || 'SELECT n.cartodb_id FROM n WHERE cartodb_id >= 0 AND '
      || ' n.the_geom IS NULL ) RETURNING p.cartodb_id ), do_insert AS ('
      || 'INSERT INTO leaflet_data (the_geom)'
      || 'SELECT n.the_geom FROM n WHERE n.cartodb_id < 0 AND '
      || ' n.the_geom IS NOT NULL RETURNING cartodb_id ) '
      || 'SELECT 0,cartodb_id FROM do_update UNION ALL '
      || 'SELECT 1,cartodb_id FROM do_insert UNION ALL '
      || 'SELECT -1,cartodb_id FROM do_delete';

RAISE DEBUG '%', sql;

RETURN QUERY EXECUTE sql;

END;
$$;

-- Grant access to the public user
GRANT EXECUTE ON FUNCTION leaflet_upsert_usercomments(integer[],text[]) TO publicuser;
