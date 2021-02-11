### Managing Virtual Environments
* Create the environment with `conda env create -f nourish.yml`
* Activate it with `conda activate nourish`
* Update it with `conda env update --file nourish.yml  --prune`

### PostgreSQL
* Start DB server with `pg_ctl -D nourish_db -l logfile start`
* allison, nourish