$(function(){
    $('#new-rider').on('click', () => {
        event.preventDefault();
        let name = $('#newRiderName')
        let date = $('#newRiderDate')
        name = name.val()
        date = date.val()
        let newRider = {}
        newRider.name = name
        newRider.date = date
        $.ajax({
            url:'/newRider',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ newRider: newRider}),
            success: (response) => {
                console.log(response)
            }
        })
    })
})