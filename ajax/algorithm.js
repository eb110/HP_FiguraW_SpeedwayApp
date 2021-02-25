let teamA = []
let teamB = []
let speedwayRiders = []
let tablePositions1 = []
let tablePositionsMainPrintout = []
let startingFlag = 0
let finalResultGuest = []
let finalResultHome = []

$(function () {
    $('#get-result').on('click', () => {
        event.preventDefault();
        teamA = playersDataCollect(1)
        teamB = playersDataCollect(9)
        temporaryData(teamA, teamB)
        speedwayRiders = teamA.concat(teamB)
        createInitialTablePositions()
        bonusCalculations()
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
                let teamLeftEL = $('#teamLeft')
                let wsad = ''
                for(let i = 0; i < 8; i++){
                    let a = finalResultGuest[i].name
                    let temp = '<div id="square2">' + a + '</div>'
                    temp += '<div id="square3">' + finalResultGuest[i].points[0] +
                    ' ' + finalResultGuest[i].points[1] + ' ' + finalResultGuest[i].points[2] + 
                    ' ' + finalResultGuest[i].points[3] + ' ' + finalResultGuest[i].points[4] +
                    '</div> <div style="clear:both">'
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
                let teamRightEL = $('#teamRight')
                let wsad = ''
                for(let i = 0; i < 8; i++){
                    let a = finalResultHome[i].name
                    let temp = '<div id="square2">' + a + '</div>'
                    temp += '<div id="square3">' + finalResultHome[i].points[0] +
                    ' ' + finalResultHome[i].points[1] + ' ' + finalResultHome[i].points[2] + 
                    ' ' + finalResultHome[i].points[3] + ' ' + finalResultHome[i].points[4] +
                    '</div> <div style="clear:both">'
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
            for(let k = 0; k < 16; k++){
                if(speedwayRiders[k].name != '' && wsad.includes(speedwayRiders[k].name)){
                    tablePositions1[i][j].name = speedwayRiders[k].name
                    tablePositions1[i][j].points = speedwayRiders[k].points[speedwayRiders[k].position++]
                    break
                }
            }
        }
    }
    bonusCalculations()
}

function createMainTablePrintout(){
    let home = 0
    let guests = 0
    if(startingFlag == 0)startingFlag = 1
    else createUpdatedTablePositions()
    for(let i = 0; i < 8; i++){
        teamA[i].position = 0
        teamB[i].position = 0
    }
    tablePositionsMainPrintout = []
    for (let i = 0; i < 13; i++) {
        let h1 = tablePositions1[i][2].points
        let h2 = tablePositions1[i][3].points
        let g1 = tablePositions1[i][0].points
        let g2 = tablePositions1[i][1].points
        tablePositionsMainPrintout.push(colourTheDiv(h1, h2, g1, g2))
        tablePositionsMainPrintout.push('<label class="l2">' + (i + 1) + '</label>')
        home += 'duwns-'.includes(h1) ? 0 : parseInt(h1)
        home += 'duwns-'.includes(h2) ? 0 : parseInt(h2)
        guests += 'duwns-'.includes(g1) ? 0 : parseInt(g1)
        guests += 'duwns-'.includes(g2) ? 0 : parseInt(g2)
        for (let k = 0; k < 4; k++) {
            let pkt = tablePositions1[i][k].points
            tablePositionsMainPrintout.push('<select id="h' + i + 'r' + k + '"><optgroup>')
            tablePositionsMainPrintout.push('<option value="' + tablePositions1[i][k].name + '">' + 
            tablePositions1[i][k].name + '</option>')  
            let inlet = reserveRidersQueue(tablePositions1[i][k].name)
            for (let j = 0; j < inlet.length; j++) {
                tablePositionsMainPrintout.push('<option value="' + inlet[j].name + ' (' + inlet[j].point + ') ' + '">' + 
                inlet[j].name + ' (' + inlet[j].point + ') ' + '</option>')                      
            }
            tablePositionsMainPrintout.push('</optgroup></select>')
            tablePositionsMainPrintout.push('<input type="text" value="' + pkt + '">')
            if(k == 1){
                tablePositionsMainPrintout.push('<label class="l1">Guests: ' + guests + '</label>')
                tablePositionsMainPrintout.push('<label class="l1">Home: ' + home + '</label>')
            }
        }
        tablePositionsMainPrintout.push('</div>')
    }
}

function bonusCalculations(){
    finalResultHome = []
    finalResultGuest = []
    for(let i = 0; i < 8; i++){
        finalResultGuest.push({})
        finalResultHome.push({})
        finalResultGuest[i].name = teamA[i].name
        finalResultGuest[i].points = ['','','','','']
        finalResultHome[i].name = teamB[i].name
        finalResultHome[i].points = ['','','','','']
        finalResultGuest[i].position = 0
        finalResultHome[i].position = 0
    }
    for(let i = 0; i < 13; i++){
        let gr1 = tablePositions1[i][0].name
        let gp1 = tablePositions1[i][0].points
        let gr2 = tablePositions1[i][1].name
        let gp2 = tablePositions1[i][1].points
        let hr1 = tablePositions1[i][2].name
        let hp1 = tablePositions1[i][2].points
        let hr2 = tablePositions1[i][3].name
        let hp2 = tablePositions1[i][3].points
        if(bonusMarking(gp1, gp2, hp1, hp2))gp1 += '+'
        else if(bonusMarking(gp2, gp1, hp1, hp2))gp2 += '+'
        else if(bonusMarking(hp1, hp2, gp1, gp2))hp1 += '+'
        else if(bonusMarking(hp2, hp1, gp1, gp2))hp2 += '+'
        for(let j = 0; j < 8; j++){
            if(finalResultGuest[j].name == gr1)finalResultGuest[j].points[finalResultGuest[j].position++] = gp1 + ','
            else if(finalResultGuest[j].name == gr2)finalResultGuest[j].points[finalResultGuest[j].position++] = gp2 + ','
            if(finalResultHome[j].name == hr1)finalResultHome[j].points[finalResultHome[j].position++] = hp1 + ','
            else if(finalResultHome[j].name == hr2)finalResultHome[j].points[finalResultHome[j].position++] = hp2 + ','
        }
    }
    console.log(finalResultGuest)
    console.log(finalResultHome)
}

function bonusMarking(b, brother, a1, a2){
    if(b == '2' && brother == '3'){
        if(a1 == '1' || a2 == '1')return true
        return false
    }
    if(b == '1' && brother == '2'){
        if(a1 == '0' || a2 == '0')return true
        return false
    }
    return false
}

function colourTheDiv(a,b,c,d){
    if(a == '-' || b == '-' || c == '-' || d == '-')
    return '<div id="tableDiv" style="color:red;">'
    else return '<div id="tableDiv">'
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

function temporaryData(b, a){
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
    b[7].points[0] = ''
    b[7].points[1] = ''
    b[7].points[2] = ''
    b[7].points[3] = ''
    b[7].points[4] = ''
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

    heatPositioning(tablePositions1, 0, 0, 1, 8, 9)
    heatPositioning(tablePositions1, 1, 2, 3, 10, 11)
    heatPositioning(tablePositions1, 2, 4, 5, 12, 13)
    heatPositioning(tablePositions1, 3, 1, 6, 9, 14)
    heatPositioning(tablePositions1, 4, 4, 5, 10, 11)
    heatPositioning(tablePositions1, 5, 2, 3, 8, 9)
    heatPositioning(tablePositions1, 6, 0, 1, 12, 13)
    heatPositioning(tablePositions1, 7, 3, 6, 11, 14)
    heatPositioning(tablePositions1, 8, 4, 5, 8, 9)
    heatPositioning(tablePositions1, 9, 2, 3, 12, 13)
    heatPositioning(tablePositions1, 10, 0, 1, 10, 11)
    heatPositioning(tablePositions1, 11, 2, 5, 8, 12)
    heatPositioning(tablePositions1, 12, 0, 4, 10, 13)
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