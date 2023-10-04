<?php

include_once "../backend/connect.php";

try {
    $insert = "SELECT p.Primera_Carta_Partida, p.Segunda_Carta_Partida, p.Cant_Barajas_Partida
                FROM partida p
                WHERE p.ID_Partida = 1;";

    $insert2 = "SELECT Valor_Carta FROM cartas WHERE ID_Partida = 1;";

    $stmtInsert = $conn->prepare($insert);
    $stmtInsert2 = $conn->prepare($insert2);

    $primera_carta;
    $segunda_carta;
    $cant_baraja;
    $cartas = [];

    if ($stmtInsert->execute()) {
        $resultsInsert = $stmtInsert->fetchAll(PDO::FETCH_ASSOC);

        foreach ($resultsInsert as $row) {
            $primera_carta = $row['Primera_Carta_Partida'];
            $segunda_carta = $row['Segunda_Carta_Partida'];
            $cant_baraja = $row['Cant_Barajas_Partida'];
        }
    }

    if ($stmtInsert2->execute()) {
        $resultsInsert2 = $stmtInsert2->fetchAll(PDO::FETCH_ASSOC);
        foreach ($resultsInsert2 as $row) {
            array_push($cartas, $row['Valor_Carta']);
        }
    }

    // Crear un arreglo asociativo con los datos que deseas devolver
    $response = ['primera_carta' => $primera_carta, 'segunda_carta' => $segunda_carta, 'cant_baraja' => $cant_baraja, 'cartas'=>$cartas];

    // Establecer la cabecera de respuesta como JSON
    header('Content-Type: application/json');

    // Devolver la respuesta JSON
    echo json_encode($response);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
