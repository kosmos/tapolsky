<?php
if( isset($_POST) ){

    //form validation vars
    $formok = true;
    $errors = array();

    //sumbission data
    $ipaddress = $_SERVER['REMOTE_ADDR'];
    $date = date('d/m/Y');
    $time = date('H:i:s');

    //form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $telephone = $_POST['telephone'];

    //save to file
    $path = 'form-data.txt';
    $fh = fopen($path,"a+");
    $string = $date.' - '.$time.' - '.$name.' - '.$email.' - '.$telephone.PHP_EOL;
    fwrite($fh,$string); // Write information to the file
    fclose($fh); // Close the file

    //form validation to go here....
    //validate name is not empty
    if(empty($name)){
        $formok = false;
        $errors[] = "Вы не заполнили поле Имя";
    }

    //validate telephone is not empty
    if(empty($telephone)){
        $formok = false;
        $errors[] = "Вы не заполнили поле Телефон";
    }

    //validate email address is not empty
    if(empty($email)){
        $formok = false;
        $errors[] = "Вы не ввели e-mail";
    //validate email address is valid
    }elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $formok = false;
        $errors[] = "Вы ввели не корректный e-mail";
    }

    //send email if all is ok
    if($formok){
        $headers = "From: info@fleet5.com" . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        $emailbody = "<p>Заявка на участие в Весна на Канарах</p>
                      <p><strong>Имя: </strong> {$name} </p>
                      <p><strong>Email: </strong> {$email} </p>
                      <p><strong>Телефон: </strong> {$telephone} </p>
                      <p>This message was sent from the IP Address: {$ipaddress} on {$date} at {$time}</p>";

        mail("info@fleet5.com,km@r2d2-ventures.com,nikita@r2d2-ventures.com","Новый запрос Канары",$emailbody,$headers);

    }

    //what we need to return back to our form
    $returndata = array(
        'posted_form_data' => array(
            'name' => $name,
            'email' => $email,
            'telephone' => $telephone
        ),
        'form_ok' => $formok,
        'errors' => $errors
    );

    //if this is not an ajax request
    if(empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) !== 'xmlhttprequest'){
        //set session variables
        session_start();
        $_SESSION['cf_returndata'] = $returndata;

        //redirect back to form
        header('location: ' . $_SERVER['HTTP_REFERER']);
    }
}
