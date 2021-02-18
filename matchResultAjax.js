$(function(){
    $('#get-result').on('click', () => {
        $.ajax({
            url: '/resultTable',
            contentType: 'application/json',
            success: (response) => {
                let ridersBase = []
                for(let i = 1; i <= 16; i++){
                    let wsad = '#Rnr' + i
                    let rev = $(wsad)
                    ridersBase.push({})
                    ridersBase[i-1].name = rev.val()
                    ridersBase[i-1].points = []
                    for(let j = 1; j <= 5; j++){
                        let wsad2 = '#Rnr' + i + 'Pnr' + j
                        let rev2 = $(wsad2)
                        ridersBase[i - 1].points.push(rev2.val())
                        console.log(ridersBase[i-1].points[j-1])
                    }
                    console.log(ridersBase[i-1].name)
                }
                const biegi = 13
                let wsad = '<div>KURWA JEGO</div>'
                let tbodyEL = $('dupa')
                tbodyEL.html('')
                for(let i = 0; i < biegi; i++){
                tbodyEL.append('\
                ' + wsad + '\
                ')
                }
            }
        })
    })
})