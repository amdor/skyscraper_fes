<?php
    $carUris = $_POST["uri"];
    $service_url = 'http://localhost:8089/';
    $curl = curl_init($service_url);
    
    $curl_post_data = "";
    foreach($carUris as $carUri){
            $curl_post_data += $car+"\n";
    }

    //curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); //we need it to echo
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
    curl_exec($curl);
    curl_close($curl);
?>