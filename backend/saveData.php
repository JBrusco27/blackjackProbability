<?php

include_once "../backend/connect.php";

$first_card = $_POST['firstCard'];
$second_card = $_POST['secCard'];
$cards = explode(',', $_POST['cards']);
$cant_baraj = $_POST['cantBaraj'];

try {
    $insert = "UPDATE partida
                SET Primera_Carta_Partida = :first_card,
                    Segunda_Carta_Partida = :second_card,
                    Cant_Barajas_Partida = :cant_baraj
                WHERE ID_Partida = 1;";

    $insert3 = "INSERT INTO cartas (ID_Partida, Valor_Carta)VALUES (1, :carta);";

    $insert2 = "DELETE FROM cartas WHERE ID_Partida = 1;";

    $stmtInsert = $conn->prepare($insert);
    $stmtInsert2 = $conn->prepare($insert2);
    $stmtInsert3 = $conn->prepare($insert3);
    

    $stmtInsert->bindParam(':first_card', $first_card, PDO::PARAM_STR);
    $stmtInsert->bindParam(':second_card', $second_card, PDO::PARAM_STR);
    $stmtInsert->bindParam(':cant_baraj', $cant_baraj, PDO::PARAM_STR);

    
    if ($stmtInsert2->execute()) {
        
        $stmtInsert->execute();

        if($cards[0] != ''){
            foreach ($cards as $cardsun) {
                $stmtInsert3->bindParam(':carta', $cardsun, PDO::PARAM_STR);
                if ($stmtInsert3->execute()) {
                    echo json_encode(true);
                }else{
                    echo json_encode(false);
                }
            }
        }
        
    }else{
        echo json_encode(false);
    }


} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>