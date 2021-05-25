import load from './query';
window.load = load;

load(`select country_code, long_name from wdi_country limit 3;`);