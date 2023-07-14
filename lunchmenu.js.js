function convertTableToJSON(html) {
  var cleanedHtml = html.replace(/\n/g, '').replace(/\s+/g, ' ');
  var tableRegex = /<tbody>(.*?)<\/tbody>/;
  var tableMatches = cleanedHtml.match(tableRegex);
  if (!tableMatches || tableMatches.length < 2) {
    return null;
  }
  var tableRows = tableMatches[1].split('</tr>');
  var result = {};
  for (var i = 0; i < tableRows.length; i++) {
    var row = tableRows[i].trim();
    var itemRegex = /<td>(.*?)<\/td>/g;
    var itemMatches = row.match(itemRegex);
    if (!itemMatches || itemMatches.length < 7) {
      continue;
    }
    var menuNumber = itemMatches[0].replace(/<td>|<\/td>/g, '').trim();
    var menuItems = [];
    for (var j = 1; j < itemMatches.length; j++) {
      var menuItem = itemMatches[j].replace(/<td>|<\/td>/g, '').trim();
      menuItems.push(menuItem);
    }
    if (!result[menuNumber]) {
      result[menuNumber] = [];
    }
    result[menuNumber].push(menuItems);
  }
  var jsonData = JSON.stringify(result, null, 2);
  return jsonData;
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(msg == "/급식"){
  var result = "[오늘의 급식]\n";
  var menu = String(org.jsoup.Jsoup.connect("https://www.paichai.hs.kr/?c=4/29/70").get().select("#bbslist > table:nth-child(2) > tbody"));
  var menu_json = JSON.parse(convertTableToJSON(menu));
  let today = new Date().getDate().toString().padStart(2,"0")
  //#bbslist > table:nth-child(2) > tbody > tr:nth-child(1)
  for(let i = 0; menu_json[String(today)][i]; i++){
  menu_json[String(today)][i].forEach(function(menu) {
  if (menu.startsWith("(")){
    result += menu.split(")")[0].substr(1) + "\n" +  "- " + menu.split(")")[1] + "\n";
  }
  result += "- " + menu + "\n";});
  }
  replier.reply(result);
  }
}