let teamA = []
let teamB = []
let speedwayRiders = []
let tablePositions1 = []
let tablePositionsMainPrintout = []
let startingFlag = 0
let finalResultGuest = []
let finalResultHome = []
let initialPositions = []
let ridersChanges = []

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

    $('#restart-button').on('click', () => {
        for (let i = 0; i < 13; i++) {
            tablePositions1[i] = initialPositions[i]
        }
        startingFlag = 0
        bonusCalculations()
        riderChangesFunction()
        $('#update-button').click()
    })

    $('#finish-button').on('click', () => {
        finalization()
    })

    $('#update-button').on('click', () => {
        $.ajax({
            url: '/teamLeft',
            contentType: 'application/json',
            success: (response) => {
                let teamLeftEL = $('#teamLeft')
                let wsad = ''
                for (let i = 0; i < 8; i++) {
                    let a = teamA[i].name
                    let temp = '<div id="square2">' + a + '</div>'
                    temp += '<div id="square3">' + teamA[i].points[0] +
                        ', ' + teamA[i].points[1] + ', ' + teamA[i].points[2] +
                        ', ' + teamA[i].points[3] + ', ' + teamA[i].points[4] +
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

    $('#finish-button').on('click', () => {
        $.ajax({
            url: '/teamLeft',
            contentType: 'application/json',
            success: (response) => {
                let teamLeftEL = $('#teamLeft')
                let wsad = ''
                for (let i = 0; i < finalResultGuest.length; i++) {
                    let a = finalResultGuest[i].name
                    let temp = '<div id="square2">' + a + '</div>'
                    temp += '<div id="square3">'
                    for(let j = 0; j < finalResultGuest[i].points.length; j++) {
                        if(j == finalResultGuest[i].points.length - 1){
                            finalResultGuest[i].points[j] = finalResultGuest[i].points[j][0]
                        }
                        temp += finalResultGuest[i].points[j]
                    }
                    temp += '</div> <div style="clear:both">'
                    wsad += temp
                }
                teamLeftEL.html('')
                teamLeftEL.append('\
                    ' + wsad + '\
                    ')
            }
        })
    })

    $('#finish-button').on('click', () => {
        $.ajax({
            url: '/teamRight',
            contentType: 'application/json',
            success: (response) => {
                let teamLeftEL = $('#teamRight')
                let wsad = ''
                for (let i = 0; i < finalResultHome.length; i++) {
                    let a = finalResultHome[i].name
                    let temp = '<div id="square2">' + a + '</div>'
                    temp += '<div id="square3">'
                    for(let j = 0; j < finalResultHome[i].points.length; j++) {
                        if(j == finalResultHome[i].points.length - 1){
                            finalResultHome[i].points[j] = finalResultHome[i].points[j][0]
                        }
                        temp += finalResultHome[i].points[j]
                    }
                    temp += '</div> <div style="clear:both">'
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
                for (let i = 0; i < 8; i++) {
                    let a = teamB[i].name
                    let temp = '<div id="square2">' + a + '</div>'
                    temp += '<div id="square3">' + teamB[i].points[0] +
                        ', ' + teamB[i].points[1] + ', ' + teamB[i].points[2] +
                        ', ' + teamB[i].points[3] + ', ' + teamB[i].points[4] +
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

function createUpdatedTablePositions() {
    for (let i = 0; i < 16; i++)speedwayRiders[i].position = 0
    tablePositions1 = []
    for (let i = 0; i < 13; i++) {
        tablePositions1.push([])
        for (let j = 0; j < 4; j++) {
            tablePositions1[i].push({})
            let temp = '#h' + i + 'r' + j
            let wsad = $(temp).val()
            for (let k = 0; k < 16; k++) {
                if (speedwayRiders[k].name != '' && wsad.includes(speedwayRiders[k].name)) {
                    tablePositions1[i][j].name = speedwayRiders[k].name
                    tablePositions1[i][j].points = speedwayRiders[k].points[speedwayRiders[k].position++]
                    break
                }
            }
        }
    }
    bonusCalculations()
    riderChangesFunction()
}

function finalization() {
    let finalResultGuest2 = []
    let finalResultHome2 = []
    for (let i = 0; i < 8; i++) {
        finalResultGuest2.push({})
        finalResultHome2.push({})
        finalResultGuest2[i].name = finalResultGuest[i].name
        finalResultGuest2[i].points = finalResultGuest[i].points
        finalResultHome2[i].name = finalResultHome[i].name
        finalResultHome2[i].points = finalResultHome[i].points
        finalResultHome2[i].position = 0
        finalResultGuest2[i].position = 0
        finalResultGuest[i].points = []
        finalResultHome[i].points = []
    }
    let l = ridersChanges.length
    for (let i = 0; i < 13; i++) {
        let original = []
        for (let k = 0; k < l; k++) {
            if (ridersChanges[k].heatNr == i + 1) {
                original.push(ridersChanges[k].original)
            }
        }
        for (let m = 0; m < 8; m++) {
            for (let n = 0; n < original.length; n++) {
                if (finalResultGuest[m].name == original[n]) {
                    finalResultGuest[m].points.push('-,')
                }
                if (finalResultHome[m].name == original[n]) {
                    finalResultHome[m].points.push('-,')
                }
            }
            for (let j = 0; j < 4; j++) {
                if (finalResultGuest[m].name == tablePositions1[i][j].name) {
                    finalResultGuest[m].points.push(finalResultGuest2[m].points[finalResultGuest2[m].position++])
                }
                if (finalResultHome[m].name == tablePositions1[i][j].name) {
                    finalResultHome[m].points.push(finalResultHome2[m].points[finalResultHome2[m].position++])
                }
            }
        }
    }

}

function riderChangesFunction() {
    ridersChanges = []
    let counter = 0
    for (let i = 0; i < 13; i++) {
        for (let j = 0, k = 0; j < 4; j++) {
            if (initialPositions[i][j].name != tablePositions1[i][j].name) {
                ridersChanges.push({})
                ridersChanges[counter].heatNr = i + 1
                ridersChanges[counter].original = initialPositions[i][j].name
                ridersChanges[counter].fullName = initialPositions[i][j].name + ' -> ' + tablePositions1[i][j].name
                ridersChanges[counter++].reserve = tablePositions1[i][j].name

            }
        }

    }
}

function createMainTablePrintout() {
    let home = 0
    let guests = 0
    if (startingFlag == 0) startingFlag = 1
    else createUpdatedTablePositions()
    for (let i = 0; i < 8; i++) {
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
            if (k == 1) {
                tablePositionsMainPrintout.push('<label class="l1">Guests: ' + guests + '</label>')
                tablePositionsMainPrintout.push('<label class="l1">Home: ' + home + '</label>')
            }
        }
        tablePositionsMainPrintout.push('</div>')
    }
}

function bonusCalculations() {
    finalResultHome = []
    finalResultGuest = []
    for (let i = 0; i < 8; i++) {
        finalResultGuest.push({})
        finalResultHome.push({})
        finalResultGuest[i].name = teamA[i].name
        finalResultGuest[i].points = ['', '', '', '', '']
        finalResultHome[i].name = teamB[i].name
        finalResultHome[i].points = ['', '', '', '', '']
        finalResultGuest[i].position = 0
        finalResultHome[i].position = 0
    }
    for (let i = 0; i < 13; i++) {
        let gr1 = tablePositions1[i][0].name
        let gp1 = tablePositions1[i][0].points
        let gr2 = tablePositions1[i][1].name
        let gp2 = tablePositions1[i][1].points
        let hr1 = tablePositions1[i][2].name
        let hp1 = tablePositions1[i][2].points
        let hr2 = tablePositions1[i][3].name
        let hp2 = tablePositions1[i][3].points
        if (bonusMarking(gp1, gp2, hp1, hp2)) gp1 += '+'
        else if (bonusMarking(gp2, gp1, hp1, hp2)) gp2 += '+'
        else if (bonusMarking(hp1, hp2, gp1, gp2)) hp1 += '+'
        else if (bonusMarking(hp2, hp1, gp1, gp2)) hp2 += '+'
        for (let j = 0; j < 8; j++) {
            if (finalResultGuest[j].name == gr1) finalResultGuest[j].points[finalResultGuest[j].position++] = gp1 + ','
            else if (finalResultGuest[j].name == gr2) finalResultGuest[j].points[finalResultGuest[j].position++] = gp2 + ','
            if (finalResultHome[j].name == hr1) finalResultHome[j].points[finalResultHome[j].position++] = hp1 + ','
            else if (finalResultHome[j].name == hr2) finalResultHome[j].points[finalResultHome[j].position++] = hp2 + ','
        }
    }
}

function bonusMarking(b, brother, a1, a2) {
    if (b == '2' && brother == '3') {
        if (a1 == '1' || a2 == '1') return true
        return false
    }
    if (b == '1' && brother == '2') {
        if (a1 == '0' || a2 == '0') return true
        return false
    }
    return false
}

function colourTheDiv(a, b, c, d) {
    if (a == 'ns' || b == 'ns' || c == 'ns' || d == 'ns')
        return '<div id="tableDiv" style="color:red;">'
    let temp = ''
    temp += a + "" + b + "" + c + "" + d
    if (temp.includes('0')) {
        if (temp.includes('u')) return '<div id="tableDiv" style="color:red;">'
        if (temp.includes('w')) return '<div id="tableDiv" style="color:red;">'
        if (temp.includes('ns')) return '<div id="tableDiv" style="color:red;">'
        if (temp.includes('d')) return '<div id="tableDiv" style="color:red;">'
    }
    if([a,b,c,d].filter(x => x == '1').length > 1)return '<div id="tableDiv" style="color:red;">'
    if([a,b,c,d].filter(x => x == '2').length > 1)return '<div id="tableDiv" style="color:red;">'
    if([a,b,c,d].filter(x => x == '3').length > 1)return '<div id="tableDiv" style="color:red;">'
    if([a,b,c,d].filter(x => x == '0').length > 1)return '<div id="tableDiv" style="color:red;">'
    return '<div id="tableDiv">'
}

function reserveRidersQueue(rider) {
    let reserveList = []
    let team = []
    if (teamA.some(x => x.name == rider)) team = teamA
    else team = teamB
    for (let i = 0; i < 8; i++) {
        if (team[i].name == rider) {
            team[i].position++
        }
        else if (team[i].position < 5 && team[i].points[team[i].position] != '-') {
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
        team[i].name = $(nameId).val()
        team[i].position = 0
        for (let j = 0; j < 5; j++) {
            let pointId = nameId + "Pnr" + (j + 1)
            team[i].points.push($(pointId).val())
        }
    }
    return team
}

function temporaryData(b, a) {
    a[0].position = 0
    a[0].name = 'Podlecki Zbigniew'
    a[0].points[0] = '2'
    a[0].points[1] = '3'
    a[0].points[2] = '3'
    a[0].points[3] = '2'
    a[0].points[4] = 'ns'
    a[1].position = 0
    a[1].name = 'Sulewski Jan'
    a[1].points[0] = '1'
    a[1].points[1] = '2'
    a[1].points[2] = '1'
    a[1].points[3] = 'd'
    a[1].points[4] = 'ns'
    a[2].position = 0
    a[2].name = 'Berliński Bogdan'
    a[2].points[0] = '3'
    a[2].points[1] = '2'
    a[2].points[2] = '2'
    a[2].points[3] = '3'
    a[2].points[4] = 'ns'
    a[3].position = 0
    a[3].name = 'Kaiser Stanisław'
    a[3].points[0] = '1'
    a[3].points[1] = '1'
    a[3].points[2] = '2'
    a[3].points[3] = '1'
    a[3].points[4] = 'ns'
    a[4].position = 0
    a[4].name = 'Wieczorek Roman'
    a[4].points[0] = '1'
    a[4].points[1] = '1'
    a[4].points[2] = 'ns'
    a[4].points[3] = 'ns'
    a[4].points[4] = 'ns'
    a[5].position = 0
    a[5].name = 'Tkocz Jan'
    a[5].points[0] = '3'
    a[5].points[1] = '2'
    a[5].points[2] = '2'
    a[5].points[3] = '1'
    a[5].points[4] = 'ns'
    a[6].position = 0
    a[6].name = 'Żyto Henryk'
    a[6].points[0] = '3'
    a[6].points[1] = '3'
    a[6].points[2] = '3'
    a[6].points[3] = '3'
    a[6].points[4] = 'ns'
    a[7].position = 0
    a[7].name = 'DNS'
    a[7].points[0] = 'ns'
    a[7].points[1] = 'ns'
    a[7].points[2] = 'ns'
    a[7].points[3] = 'ns'
    a[7].points[4] = 'ns'
    b[0].position = 0
    b[0].name = 'Pytko Zygmunt'
    b[0].points[0] = '3'
    b[0].points[1] = '3'
    b[0].points[2] = '3'
    b[0].points[3] = '3'
    b[0].points[4] = '2'
    b[1].position = 0
    b[1].name = 'Ptak Józef'
    b[1].points[0] = '0'
    b[1].points[1] = '1'
    b[1].points[2] = '0'
    b[1].points[3] = 'ns'
    b[1].points[4] = 'ns'
    b[2].position = 0
    b[2].name = 'Chorabik Stanisław'
    b[2].points[0] = '2'
    b[2].points[1] = '0'
    b[2].points[2] = 'u'
    b[2].points[3] = '1'
    b[2].points[4] = 'ns'
    b[3].position = 0
    b[3].name = 'Kwaśniewicz Jan'
    b[3].points[0] = '0'
    b[3].points[1] = '2'
    b[3].points[2] = '1'
    b[3].points[3] = 'ns'
    b[3].points[4] = 'ns'
    b[4].position = 0
    b[4].name = 'Tanaś Andrzej'
    b[4].points[0] = '2'
    b[4].points[1] = '0'
    b[4].points[2] = '2'
    b[4].points[3] = '1'
    b[4].points[4] = '0'
    b[5].position = 0
    b[5].name = 'Golonka Andrzej'
    b[5].points[0] = 'w'
    b[5].points[1] = '1'
    b[5].points[2] = '0'
    b[5].points[3] = 'ns'
    b[5].points[4] = 'ns'
    b[6].position = 0
    b[6].name = 'Pacura Stanisław'
    b[6].points[0] = 'u'
    b[6].points[1] = 'u'
    b[6].points[2] = '0'
    b[6].points[3] = 'ns'
    b[6].points[4] = 'ns'
    b[7].position = 0
    b[7].name = 'DNS'
    b[7].points[0] = 'ns'
    b[7].points[1] = 'ns'
    b[7].points[2] = 'ns'
    b[7].points[3] = 'ns'
    b[7].points[4] = 'ns'
}

function createInitialTablePositions() {
    for (let i = 0; i < 16; i++)speedwayRiders[i].position = 0
    tablePositions1 = []
    for (let i = 0; i < 13; i++) {
        tablePositions1.push([])
        for (let j = 0; j < 4; j++) {
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
    for (let i = 0; i < 13; i++) initialPositions[i] = tablePositions1[i]
}

function heatPositioning(table, heat, a, b, c, d) {
    table[heat][0].name = speedwayRiders[a].name
    table[heat][0].points = speedwayRiders[a].points[speedwayRiders[a].position++]
    table[heat][1].name = speedwayRiders[b].name
    table[heat][1].points = speedwayRiders[b].points[speedwayRiders[b].position++]
    table[heat][2].name = speedwayRiders[c].name
    table[heat][2].points = speedwayRiders[c].points[speedwayRiders[c].position++]
    table[heat][3].name = speedwayRiders[d].name
    table[heat][3].points = speedwayRiders[d].points[speedwayRiders[d].position++]
}