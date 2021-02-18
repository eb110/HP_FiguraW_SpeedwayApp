$(function(){
    $('#get-result').on('click', () => {
        $.ajax({
            url: '/resultTable',
            contentType: 'application/json',
            success: (response) => {
                let tbodyEL = $('dupa')
                tbodyEL.html('')
                tbodyEL.append('\
                o kuchwa\
                ')
            }
        })
    })
})