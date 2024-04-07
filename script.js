$(document).ready(function(){
    let index = -1
    $('#stateInput').on('keyup',function(e){
        const keyCode = e.keyCode || e.which;
        // 40 ArrowDown
        // 38 ArrowUp
        if(keyCode ===40 || keyCode===38){
            // Down or Up arrow key pressed
            const suggestionsCount = $('#suggestions li').length;
            if (keyCode === 40 && index < suggestionsCount - 1) index++; // Down
            if (keyCode === 38 && index > 0) index--; // Up
            $('#suggestions li').removeClass('selected').eq(index).addClass('selected');

        }else if (keyCode === 13) {
            if (index >= 0) {
                $('#stateInput').val($('#suggestions li').eq(index).text()).blur();
                $('#suggestions').empty();
                index = -1; // Reset index
            }
        } else {
            // For other keys, fetch the filtered states
            const query = $(this).val();
            fetchStates(query);
        }
    })

    $('#stateInput').on('focus',function(e){
        const query = $(this).val();
        if (query) fetchStates(query);
    })

    $('#stateInput').on('blur', function() {
        // Hide suggestions on input blur, but allow time for click to register
        setTimeout(() => $('#suggestions').empty(), 200);
    });

    $('#suggestions').on('click','li',function(e){
        $('#stateInput').val($(this).text())
        $('#suggestions').empty()
    })

    function fetchStates(query) {
        if (!query) {
            $('#suggestions').empty();
            return;
        }

        $.ajax({
            url: `http://localhost:3000/api/states?search=${query}`,
            type: 'GET',
            success: function(data) {
                displaySuggestions(data);
            }
        });
    }

    function displaySuggestions(states) {
        $('#suggestions').empty();
        states.forEach(state => {
            $('#suggestions').append(`<li>${state}</li>`);
        });
        if (states.length > 0) {
            $('#suggestions').show();
        } else {
            $('#suggestions').hide();
        }
    }
})