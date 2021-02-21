$(function () {
    $('#get-result').on('click', () => {
        event.preventDefault();
        let teamA = []
        let teamB = []
        teamA = playersDataCollect(1)
        teamB = playersDataCollect(9)
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
                for (let i = 0; i < 13; i++) {
                    wsad.push('<div id="tableDiv"><form">')
                    for (let k = 0; k < 4; k++) {
                        wsad.push('<input type="text" list="datalist2">')
                        wsad.push('<datalist id="datalist2">')
                        for (let j = 0; j < l; j++) {
                            wsad.push('<option value="' + riders[j] + '">')
                        }
                        wsad.push('</datalist>')
                    }
                    wsad.push('<button>Confirm</button>')
                    wsad.push('</form></div>')
                }
                let wsad2 = wsad.join('')
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

function playersDataCollect(range) {
    let team = []
    for (let i = 0; i < 8; i++) {
        team.push({})
        team[i].points = []
        let nameId = '#Rnr' + (i + range)
        team[i].name = $(nameId).val() + 'NAME' + (i + range)
        for (let j = 0; j < 5; j++) {
            let pointId = nameId + "Pnr" + (j + 1)
            team[i].points.push($(pointId).val() + j)
        }
    }
    return team
}