function doGet() {
  return HtmlService.createTemplateFromFile("index.html").evaluate();
}

function getCurrentWeekType() {
  const firstWeekStart = new Date("2024-09-02"); // перший понеділок навчального року
  const today = new Date();

  const diffInWeeks = Math.floor(
    (today - firstWeekStart) / (1000 * 60 * 60 * 24 * 7)
  );

  return diffInWeeks % 2 === 0 ? "Чисельник" : "Знаменник";
}


function getScheduleForGroupAndDay(group, day) {
  const weekType = getCurrentWeekType();
  const sheet = SpreadsheetApp.openById(
    "1Pqx0UDzGQMjl6G0iZtcp5ftiv2YeuOQ8xqn6nYM3_A4"
  ).getSheetByName(weekType);;
  
    const data = sheet.getDataRange().getValues();
      if (data.length < 2) return [];

  return data
    .slice(1)
    .filter(function (row) {
      return row[0] === day && row[1] === group;
    })
    .map(function (row) {
      return {
        day: row[0],
        group: row[1],
        number: row[2],
        subject: row[3],
        teacher: row[4],
        room: row[5],
        time: row[6],
      };
    });
}

function getLoginOptions() {
  var sheet = SpreadsheetApp.openById(
    "1Pqx0UDzGQMjl6G0iZtcp5ftiv2YeuOQ8xqn6nYM3_A4"
  ).getSheetByName("Чисельник");
  var lastRow = sheet.getLastRow();

  var groupsRaw = sheet.getRange("I2:I" + lastRow).getValues();
  var teachersRaw = sheet.getRange("J2:J" + lastRow).getValues();

  var groupsRange = [].concat.apply([], groupsRaw).filter(String);
  var teachersRange = [].concat.apply([], teachersRaw).filter(String);

  function unique(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  return {
    groups: unique(groupsRange),
    teachers: unique(teachersRange),
  };
}

function getScheduleForTeacherAndDay(teacher, day) {
  const weekType = getCurrentWeekType();
  const sheet = SpreadsheetApp.openById(
    "1Pqx0UDzGQMjl6G0iZtcp5ftiv2YeuOQ8xqn6nYM3_A4"
  ).getSheetByName(weekType);

  const data = sheet.getDataRange().getValues();
    if (data.length < 2) return [];
    
  return data
    .slice(1)
    .filter(function (row) {
      return row[0] === day && row[4] === teacher;
    })
    .map(function (row) {
      return {
        day: row[0],
        group: row[1],
        number: row[2],
        subject: row[3],
        teacher: row[4],
        room: row[5],
        time: row[6],
      };
    });
}
