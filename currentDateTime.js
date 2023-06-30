$(document).ready(function() {
    // Function to fetch the current date and time
    function fetchCurrentDateTime() {
        $.ajax({
            url: "http://127.0.0.1/jobHistory_back/jobHistoryApi.php?action=getCurrentDateTime",
            type: "GET",
            dataType: "json",
            success: function(response) {
                var currentDateTime = response.current_datetime;

                // Display the current date and time
                $("#currentDateTime").text(currentDateTime);
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }

    // Fetch the initial current date and time
    fetchCurrentDateTime();

    // Update the current date and time every 10 seconds
    setInterval(fetchCurrentDateTime, 10000);
});

