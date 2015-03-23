<?php
    $to = "mansour@mjmonline.se";
    $from = $_REQUEST['userEmail'];
    $name = $_REQUEST['userName'];
    $headers = "From: $from";
    $subject = "Message sent from portfolio";

    $fields = array(); 
    $fields{"userName"} = "name";
    $fields{"userEmail"} = "email";
    $fields{"userMessage"} = "message";

    $body = "Here is what was sent:\n\n";
    foreach($fields as $a => $b) {
        $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]);
    }

    $send = mail($to, $subject, $body, $headers);
?>