export function dateToStr(dateStr) {
  var json_date = new Date(dateStr).toJSON()
  return new Date(+new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
