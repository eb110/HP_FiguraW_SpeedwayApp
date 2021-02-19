$(function(){
    $('#get-result').on('click', () => {
        $.ajax({
            url: '/resultTable',
            contentType: 'application/json',
            success: (response) => {   
                let riders = response.riders
                let l = riders.length
                let wsad = []
                for(let i = 0; i < 13; i++){
                    wsad.push('<div><form">')      
                    for(let k = 0; k < 4; k++){      
                        wsad.push('<input type="text" list="datalist2" value="kolo">')
                        wsad.push('<datalist id="datalist2">')
                        for(let j = 0; j < 5; j++){
                            wsad.push('<option value="dupa">')
                        }
                        wsad.push('</datalist>')
                    }
                    wsad.push('<button>Confirm</button>')
                    wsad.push('</form></div>')
                }
                let wsad2 = wsad.join('')
                let tbodyEL = $('dupa')
                tbodyEL.html('')
                tbodyEL.append('\
                ' + wsad2 + '\
                ')
            }})})})

