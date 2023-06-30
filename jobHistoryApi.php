<?php
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        // Handle preflight CORS request
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: text/plain');
        die();
    }
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    
    // Establish a database connection
    $servername = "localhost";
    $username = "KIM";
    $password = "YoungHee";
    $dbname = "jobhistory";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Handle API requests
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['action'])) {
            $action = $_GET['action'];
            //currentDateTime
            if ($action === 'getCurrentDateTime') {
                // Retrieve the current date and time from the database server
                $sql = "SELECT NOW() AS current_datetime";
                $result = $conn->query($sql);
    
                if ($result) {
                    $row = $result->fetch_assoc();
                    $currentDateTime = $row['current_datetime'];
    
                    // Return the current date and time as JSON response
                    echo json_encode(['current_datetime' => $currentDateTime]);
                } else {
                    // Query execution failed
                    echo json_encode(['error' => 'Failed to retrieve current date and time']);
                }
            }
            elseif ($action === 'listNames') {
                // Retrieve the list of names
                $sql = "SELECT name, firstname, person_id FROM person";
                $result = $conn->query($sql);
                $names = array();
    
                if ($result->num_rows > 0) {
                    // Loop through the query results and store names in an array
                    while ($row = $result->fetch_assoc()) {
                        $names[] = $row;
                    }
                }
    
                // Return the names as JSON response
                echo json_encode($names);
            } elseif ($action === 'getPersonInfo' && isset($_GET['person_id'])) {
                // Retrieve detailed information about a specific person
                $personId = $_GET['person_id'];
    
                $sql = "SELECT P.*, H.*, C.*                        
                        FROM person P
                        JOIN history H ON H.person_id = P.person_id
                        JOIN company C ON C.company_id = H.company_id
                        WHERE P.person_id = $personId";
    
                $result = $conn->query($sql);
                $personInfo = array();
    
                if ($result->num_rows > 0) {
                    // Loop through the query results and store person information in an array
                    while ($row = $result->fetch_assoc()) {
                        $personInfo[] = $row;
                    }
                }
    
                // Return the person information as JSON response
                echo json_encode($personInfo);
            } else {
                // Invalid action specified
                echo json_encode(['error' => 'Invalid action']);
            }
        } else {
            // No action specified
            echo json_encode(['error' => 'No action specified']);
        }
    }
    
    // Close the database connection
    $conn->close();
    
?>
