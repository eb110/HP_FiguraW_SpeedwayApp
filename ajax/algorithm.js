let teamA = []
let teamB = []
let speedwayRiders = []
let tablePositions1 = []
let tablePositionsMainPrintout = []

$(function () {
    $('#get-result').on('click', () => {
        event.preventDefault();
        teamA = playersDataCollect(1)
        teamB = playersDataCollect(9)
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
                let riders = response.riders
                let l = riders.length
                let wsad = []
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
                    let temp = '<div id="tableInside"><label>' + a +
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
                    let temp = '<div id="tableInside"><label>' + a +
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

function createMainTablePrintout(){
    tablePositionsMainPrintout = []
    for (let i = 0; i < 13; i++) {
        tablePositionsMainPrintout.push('<div id="tableDiv">')
        for (let k = 0; k < 4; k++) {
            tablePositionsMainPrintout.push('<select id="h' + i + 'r' + k + '">')
            tablePositionsMainPrintout.push('<option value="' + tablePositions1[i][k].name + '">' + 
            tablePositions1[i][k].name + '</option>')  
            let inlet = ''
            if([0,2,4,6,7,9,11].includes(i))inlet = teamA
            else inlet = teamB
            for (let j = 0; j < 8; j++) {
                tablePositionsMainPrintout.push('<option value="' + inlet[j].name + '">' + 
                inlet[j].name + '</option>')                      
            }
            tablePositionsMainPrintout.push('</select>')
            tablePositionsMainPrintout.push('<input type="text" value="1">')
        }
        tablePositionsMainPrintout.push('<button id="#update-button">Update</button>')
        tablePositionsMainPrintout.push('</div>')
    }
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