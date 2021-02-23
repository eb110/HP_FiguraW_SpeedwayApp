let teamA = []
let teamB = []
let speedwayRiders = []
let tablePositions1 = []
let tablePositionsMainPrintout = []
let startingFlag = 0

$(function () {
    $('#get-result').on('click', () => {
        event.preventDefault();
        teamA = playersDataCollect(1)
        teamB = playersDataCollect(9)
        temporaryData(teamA, teamB)
        speedwayRiders = teamA.concat(teamB)
        createInitialTablePositions()
        let result = [teamA, teamB]
        $.ajax({
            url: '/getResult',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ result: result }),
            success: (response) => {
                console.log(response)
                $('#update-button').click()
            }
        })
    })

    $('#update-button').on('click', () => {
        $.ajax({
            url: '/resultTable',
            contentType: 'application/json',
            success: (response) => {
                createMainTablePrintout()
                let wsad2 = tablePositionsMainPrintout.join('')
                let tbodyEL = $('#table')
                tbodyEL.html('')
                tbodyEL.append('\
                        ' + wsad2 + '\
                        ')
            }
        })
    })

    $('#update-button').on('click', () => {
        $.ajax({
            url: '/teamLeft',
            contentType: 'application/json',
            success: (response) => {
                let team = response.riders
                let teamLeftEL = $('#teamLeft')
                let wsad = ''
                for(let i = 0; i < 8; i++){
                    let a = team[i].name
                    let temp = '<div id="tableInside"><label>' + a + ' ' + team[i].points[0] +
                    ' ' + team[i].points[1] + ' ' + team[i].points[2] + ' ' + team[i].points[3] +
                    ' ' + team[i].points[4] +
                    '</label></div>'
                    wsad += temp
                }
                teamLeftEL.html('')
                teamLeftEL.append('\
                    ' + wsad + '\
                    ')
            }
        })
    })

    $('#update-button').on('click', () => {
        $.ajax({
            url: '/teamRight',
            contentType: 'application/json',
            success: (response) => {
                let team = response.riders
                let teamRightEL = $('#teamRight')
                let wsad = ''
                for(let i = 0; i < 8; i++){
                    let a = team[i].name
                    let temp = '<div id="tableInside"><label>' + a + ' ' + team[i].points[0] +
                    ' ' + team[i].points[1] + ' ' + team[i].points[2] + ' ' + team[i].points[3] +
                    ' ' + team[i].points[4] +
                    '</label></div>'
                    wsad += temp
                }
                teamRightEL.html('')
                teamRightEL.append('\
                    ' + wsad + '\
                    ')
            }
        })
    })
})

function createUpdatedTablePositions(){
    for(let i = 0; i < 16; i++)speedwayRiders[i].position = 0
    tablePositions1 = []
    for(let i = 0; i < 13; i++){
        tablePositions1.push([])
        for(let j = 0; j < 4; j++){
            tablePositions1[i].push({})
            let temp = '#h' + i + 'r' + j
            let wsad = $(temp).val()
            console.log(wsad)
            for(let k = 0; k < 16; k++){
                if(wsad.includes(speedwayRiders[k].name)){
                    tablePositions1[i][j].name = speedwayRiders[k].name
                    tablePositions1[i][j].points = speedwayRiders[k].points[speedwayRiders[k].position++]
                    break
                }
            }
        }
        console.log(tablePositions1[i])
    }
}

function createMainTablePrintout(){
    if(startingFlag == 0)startingFlag = 1
    else createUpdatedTablePositions()
    for(let i = 0; i < 8; i++){
        teamA[i].position = 0
        teamB[i].position = 0
    }
    tablePositionsMainPrintout = []
    for (let i = 0; i < 13; i++) {
        tablePositionsMainPrintout.push('<div id="tableDiv">')
        for (let k = 0; k < 4; k++) {
            tablePositionsMainPrintout.push('<select id="h' + i + 'r' + k + '"><optgroup>')
            tablePositionsMainPrintout.push('<option value="' + tablePositions1[i][k].name + '">' + 
            tablePositions1[i][k].name + '</option>')  
            let inlet = reserveRidersQueue(tablePositions1[i][k].name)
            for (let j = 0; j < inlet.length; j++) {
                tablePositionsMainPrintout.push('<option value="' + inlet[j].name + ' (' + inlet[j].point + ') ' + '">' + 
                inlet[j].name + ' (' + inlet[j].point + ') ' + '</option>')                      
            }
            tablePositionsMainPrintout.push('</optgroup></select>')
            tablePositionsMainPrintout.push('<input type="text" value="' + tablePositions1[i][k].points + '">')
        }
        tablePositionsMainPrintout.push('</div>')
    }
}

function reserveRidersQueue(rider){
    let reserveList = []
    let team = []
    if(teamA.some(x => x.name == rider))team = teamA
    else team = teamB
    for(let i = 0; i < 8; i++){
        if(team[i].name == rider) {
            team[i].position++
        }
        else if(team[i].position < 5 && team[i].points[team[i].position] != '-'){
            let wsad = {}
            wsad.name = team[i].name
            wsad.point = team[i].points[team[i].position]
            reserveList.push(wsad)
        }
    }
    return reserveList
}

function playersDataCollect(range) {
    let team = []
    for (let i = 0; i < 8; i++) {
        team.push({})
        team[i].points = []
        let nameId = '#Rnr' + (i + range)
        team[i].name = $(nameId).val() + 'NAME' + (i + range)
        team[i].position = 0
        for (let j = 0; j < 5; j++) {
            let pointId = nameId + "Pnr" + (j + 1)
            team[i].points.push($(pointId).val() + j)
        }
    }
    return team
}

function temporaryData(a, b){
    a[0].position = 0
    a[0].name = 'pociejkowicz konstanty'
    a[0].points[0] = 3
    a[0].points[1] = 3
    a[0].points[2] = 3
    a[0].points[3] = 3
    a[0].points[4] = '-'
    a[1].position = 0
    a[1].name = 'bruzda piotr'
    a[1].points[0] = 2
    a[1].points[1] = 2
    a[1].points[2] = 2
    a[1].points[3] = 2
    a[1].points[4] = '-'
    a[2].position = 0
    a[2].name = 'trzeszkowski jerzy'
    a[2].points[0] = 3
    a[2].points[1] = 3
    a[2].points[2] = 3
    a[2].points[3] = 3
    a[2].points[4] = '-'
    a[3].position = 0
    a[3].name = 'domiszewski andrzej'
    a[3].points[0] = 'u'
    a[3].points[1] = '-'
    a[3].points[2] = '-'
    a[3].points[3] = '-'
    a[3].points[4] = '-'
    a[4].position = 0
    a[4].name = 'jaroszewicz bohdan'
    a[4].points[0] = 'w'
    a[4].points[1] = 3
    a[4].points[2] = 3
    a[4].points[3] = 2
    a[4].points[4] = '-'
    a[5].position = 0
    a[5].name = 'antos zygmunt'
    a[5].points[0] = 3
    a[5].points[1] = 1
    a[5].points[2] = 1
    a[5].points[3] = '-'
    a[5].points[4] = '-'
    a[6].position = 0
    a[6].name = 'słaboń adolf'
    a[6].points[0] = 3
    a[6].points[1] = 3
    a[6].points[2] = 2
    a[6].points[3] = '-'
    a[6].points[4] = '-'
    a[7].position = 0
    a[7].name = 'nowak stanisław'
    a[7].points[0] = 2
    a[7].points[1] = 1
    a[7].points[2] = 1
    a[7].points[3] = '-'
    a[7].points[4] = '-'
    b[0].position = 0
    b[0].name = 'malinowski jan'
    b[0].points[0] = 1
    b[0].points[1] = 2
    b[0].points[2] = 'd'
    b[0].points[3] = 2
    b[0].points[4] = 1
    b[1].position = 0
    b[1].name = 'lalicki stanisław'
    b[1].points[0] = 0
    b[1].points[1] = 1
    b[1].points[2] = 'd'
    b[1].points[3] = 0
    b[1].points[4] = '-'
    b[2].position = 0
    b[2].name = 'kolber jan'
    b[2].points[0] = 2
    b[2].points[1] = 'w'
    b[2].points[2] = 2
    b[2].points[3] = 1
    b[2].points[4] = '-'
    b[3].position = 0
    b[3].name = 'stawecki marian'
    b[3].points[0] = 1
    b[3].points[1] = 1
    b[3].points[2] = 2
    b[3].points[3] = 'd'
    b[3].points[4] = '-'
    b[4].position = 0
    b[4].name = 'batko józef'
    b[4].points[0] = 2
    b[4].points[1] = 1
    b[4].points[2] = 'u'
    b[4].points[3] = '-'
    b[4].points[4] = '-'
    b[5].position = 0
    b[5].name = 'spychała marian'
    b[5].points[0] = 1
    b[5].points[1] = 0
    b[5].points[2] = 0
    b[5].points[3] = '-'
    b[5].points[4] = '-'
    b[6].position = 0
    b[6].name = 'krajewski marian'
    b[6].points[0] = 0
    b[6].points[1] = 0
    b[6].points[2] = 0
    b[6].points[3] = '-'
    b[6].points[4] = '-'
    b[7].position = 0
    b[7].name = ''
    b[7].points[0] = '-'
    b[7].points[1] = '-'
    b[7].points[2] = '-'
    b[7].points[3] = '-'
    b[7].points[4] = '-'
}

function createInitialTablePositions()
{
    for(let i = 0; i < 16; i++)speedwayRiders[i].position = 0
    tablePositions1 = []
    for(let i = 0; i < 13; i++){
        tablePositions1.push([])
        for(let j = 0; j < 4; j++){
            tablePositions1[i].push({})
        }
    } 

    heatPositioning(tablePositions1, 0, 0, 8, 1, 9)
    heatPositioning(tablePositions1, 1, 10, 2, 11, 3)
    heatPositioning(tablePositions1, 2, 4, 12, 5, 13)
    heatPositioning(tablePositions1, 3, 9, 1, 14, 6)
    heatPositioning(tablePositions1, 4, 4, 10, 5, 11)
    heatPositioning(tablePositions1, 5, 8, 2, 9, 3)
    heatPositioning(tablePositions1, 6, 0, 12, 1, 13)
    heatPositioning(tablePositions1, 7, 3, 11, 6, 14)
    heatPositioning(tablePositions1, 8, 8, 4, 9, 5)
    heatPositioning(tablePositions1, 9, 2, 12, 3, 13)
    heatPositioning(tablePositions1, 10, 10, 0, 11, 1)
    heatPositioning(tablePositions1, 11, 2, 8, 5, 12)
    heatPositioning(tablePositions1, 12, 10, 0, 13, 4)
}

function heatPositioning(table, heat, a, b, c, d){
    table[heat][0].name = speedwayRiders[a].name
    table[heat][0].points = speedwayRiders[a].points[speedwayRiders[a].position++]
    table[heat][1].name = speedwayRiders[b].name
    table[heat][1].points = speedwayRiders[b].points[speedwayRiders[b].position++]
    table[heat][2].name = speedwayRiders[c].name
    table[heat][2].points = speedwayRiders[c].points[speedwayRiders[c].position++]
    table[heat][3].name = speedwayRiders[d].name
    table[heat][3].points = speedwayRiders[d].points[speedwayRiders[d].position++]
}