// Set to 00:00:00:000 today
var today = new Date(),
  day = 1000 * 60 * 60 * 24,
  map = Highcharts.map,
  dateFormat = Highcharts.dateFormat,
  series,
  projects

// Set to 00:00:00:000 today
today.setUTCHours(0)
today.setUTCMinutes(0)
today.setUTCSeconds(0)
today.setUTCMilliseconds(0)
today = today.getTime()

projects = [
  {
    project_name: '文件製作',
    current: 0,
    deals: [
      {
        rentedTo: '文件製作',
        from: today,
        to: today + 5 * day
      }
    ]
  },
  {
    project_name: '雛型設計',
    current: 1,
    deals: [
      {
        rentedTo: '雛型設計',
        from: today + 3 * day,
        to: today + 8 * day
      }
    ]
  },
  {
    project_name: '程式編寫',
    current: 1,
    deals: [
      {
        rentedTo: '程式編寫',
        from: today + 8 * day,
        to: today + 15 * day
      }
    ]
  }
]

// Parse car data into series.
series = projects.map(function (project, i) {
  var data = project.deals.map(function (deal) {
    return {
      id: 'deal-' + i,
      rentedTo: deal.rentedTo,
      start: deal.from,
      end: deal.to,
      y: i
    }
  })
  return {
    name: project.project_name,
    data: data,
    current: project.deals[project.current]
  }
})

Highcharts.ganttChart('container', {
  series: series,
  title: {
    text: '專案甘特圖'
  },
  tooltip: {
    pointFormat:
      '<span>Rented To: {point.rentedTo}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>'
  },
  xAxis: {
    currentDateIndicator: false
  },
  yAxis: {
    type: 'category',
    grid: {
      columns: [
        {
          title: {
            text: 'Model'
          },
          categories: map(series, function (s) {
            return s.name
          })
        }
      ]
    }
  }
})
