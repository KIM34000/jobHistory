$(document).ready(function() {
    var selectedPerson = null;

    function handleDoubleClick() {
        var newName = $(this).text();

        if (selectedPerson && selectedPerson.name === newName) {
            selectedPerson = null;
            $("#selectedNames").empty();
            $("#personInfo").empty();
        } else {
            selectedPerson = {
                name: newName,
                id: $(this).data("person-id")
            };
            $("#selectedNames").html("<p>" + selectedPerson.name + "</p>");

            // Retrieve the selected person's information
            $.ajax({
                url: "http://127.0.0.1/jobHistory_back/jobHistoryApi.php?action=getPersonInfo&person_id=" + selectedPerson.id,
                type: "GET",
                dataType: "json",

                success: function(personInfo) {
                    if (personInfo.length > 0) {
                        var html = '<ul style="list-style-type: none; padding: 0;">';
                        console.log(personInfo);
                        var colour;
                        var today = new Date();
                        var birthday = new Date(personInfo[0].datebirth);
                        
                        var age = today.getFullYear() - birthday.getFullYear();
                        // Check if the person's birthday has already occurred this year
                        var hasBirthdayOccurred = (
                        today.getMonth() > birthday.getMonth() ||
                        (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate())
                        );
                        console.log(hasBirthdayOccurred);
                        // Adjust the age if the person's birthday has not occurred yet this year
                        if (!hasBirthdayOccurred) {
                        age--;
                        }

                        birthday.setFullYear(today.getFullYear());
                        today.setHours(0, 0, 0, 0);
                        birthday.setHours(0, 0, 0, 0);

                        var previousWeekStart = new Date(today);
                        previousWeekStart.setDate(today.getDate() - 7);
                        var nextWeekEnd = new Date(today);
                        nextWeekEnd.setDate(today.getDate() + 7);
                        // Compare the dateVariable with today's date and the week before/after
                        if (birthday.getTime() === today.getTime()) {
                            colour = "Tomato";
                        } else if (birthday >= previousWeekStart && birthday < today) {
                            colour = "Orange";
                        } else if (birthday > today && birthday <= nextWeekEnd) {
                            colour = "Yellow";
                        } else {
                            colour = "White";
                        }

                        html += "<b>Date of Birth: </b><mark style=\"background-color:" + colour + ";\">" + personInfo[0].datebirth + "</mark>" 
                        + " <b>Age:</b> " + age +"<br>"
                        + "<b>Address: </b>" + personInfo[0].adress + "<br>" +
                        "<b>E-mail: </b>" + personInfo[0].email + " <b>Phone Number: </b>" + personInfo[0].phone + "<br><br>";
                        personInfo.forEach(function(person) {
                            if (person.end_date === null) {
                                person.end_date = "Currently";
                            }
                            html += "<li> <b>Company Name: </b>" + person.company_name + " - <b>Job Title: </b>" + person.job_title +
                             "<br><b>Start Date: </b>" + person.start_date + "<br><b>End Date: </b>" + person.end_date + "<hr></li>";
                        });
                        html += "</ul>";
                        $("#personInfo").html(html);
                    } else {
                        $("#personInfo").html("<p>No information available.</p>");
                    }
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        }
    }

    // function to fetch the list of names
    function fetchListNames() {
    $.ajax({
        url: "http://127.0.0.1/jobHistory_back/jobHistoryApi.php?action=listNames",
        type: "GET",
        dataType: "json",
        success: function(data) {
            var personDataDiv = $("#personData");
            if (data.length > 0) {
                var html = '<ul style="list-style-type: none; padding: 0;">';
                data.forEach(function(person) {
                    var name = person.name + " " + person.firstname;
                    var personId = person.person_id;
                    if (selectedPerson && selectedPerson.name === name) {
                       // html += '<li class="selectable selected" data-person-id="' + personId + '">' + name + "</li>";
                        $("#selectedNames").html("<p>" + selectedPerson.name + "</p>");
                    } else {
                        html += '<li class="selectable" data-person-id="' + personId + '">' + name + "</li>";
                    }
                });
                html += "</ul>";
                personDataDiv.html(html);

                $(".selectable").on("dblclick", handleDoubleClick);
            } else {
                personDataDiv.html("<p>No person data available.</p>");
            }
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

// Fetch the initial list of names
fetchListNames();

// Update the list of names every 0,5 seconds
setInterval(fetchListNames, 500);
});
