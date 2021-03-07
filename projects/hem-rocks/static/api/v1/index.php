<?php
ini_set('display_errors', 1);

function get_sale_by_id($sid) {
  global $store;

  for ($i = 0; $i < count($store['sales']); $i ++) {
    if ($store['sales'][$i]['id'] === $sid) {
      return $store['sales'][$i];
    }
  }

  return false;
}

$store = json_decode(file_get_contents('store.json'), true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (isset($_GET['key']) && isset($store[$_GET['key']])) {
    echo json_encode($store[$_GET['key']]);
  }

  else if (isset($_GET['hem-cmd'])) {
    if ($_GET['hem-cmd'] === 'get-sale' && isset($_GET['sid'])) {
      $sale = get_sale_by_id($_GET['sid']);

      if ($sale) {
        echo json_encode($sale);
      }

      else {
        echo 'Error: Sale not found: ' . $_GET['sid'];
      }
    }

    else if ($_GET['hem-cmd'] === 'download' && isset($_GET['did']) && isset($_GET['sid']) && isset($_GET['ii'])) {
      if (in_array($_GET['did'], $store['dids'])) {

        if (strpos($_SERVER['HTTP_HOST'], 'localhost') === 0) {
          header('Location: http://localhost:1234/thank-you/?ad=true&sid=' . $_GET['sid'] . '&did=' . $_GET['did']);
        }

        else {
          header('Location: http://hem.rocks/already-downloaded');
        }
      }

      else {
        $sale = get_sale_by_id($_GET['sid']);

        if (!$sale) {
          echo 'Error: Sale not found';
        }

        else {
          $download_file = $sale['products'][$_GET['ii']]['downloadFile'];

          $file_url = 'http://' . $_SERVER['HTTP_HOST'] . '/hem.rocks/downloads/' . $download_file;

          echo $file_url;

          array_push($store['dids'], $_GET['did']);
          file_put_contents('store.json', json_encode($store, JSON_PRETTY_PRINT));

          header('Content-Description: File Transfer');
          header('Content-Type: application/octet-stream');
          header('Content-Disposition: attachment; filename="' . trim($download_file) . '"');

          ob_get_clean();
          readfile($file_url);
          ob_end_flush();
        }
      }
    }
  }

  else {
    echo 'Error: Bad request';
  }
}

else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_GET['hem-cmd'])) {
    if ($_GET['hem-cmd'] === 'new-sale') {
      $data = json_decode(file_get_contents('php://input'));

      $cart = array(
        'date' => date('Y-m-d', time()),
        'id' => $data->saleId,
        'products' => $data->products,
      );

      array_push($store['sales'], $cart);

      file_put_contents('store.json', json_encode($store, JSON_PRETTY_PRINT));

      echo 'OK';
    }

    else if ($_GET['hem-cmd'] === 'support-claim') {
      $data = json_decode(file_get_contents('php://input'));

      $claim = array(
        'body' => $data->body,
        'date' => date('Y-m-d', time()),
        'email' => $data->email,
        'id' => $data->messageId,
        'subject' => $data->subject,
      );

      array_push($store['supportTickets'], $claim);

      file_put_contents('store.json', json_encode($store, JSON_PRETTY_PRINT));

      $msg = 'From: ' . $data->email . "\n\r";
      $msg .= 'Case ID: ' . $data->messageId . "\n\r";
      $msg .= 'Message: ' . $data->body;

      mail('j@hem.rocks', 'New Support Claim: ' . $data->subject, wordwrap($msg));

      echo 'OK';
    }

    else if ($_GET['hem-cmd'] === 'contact-form') {
      $data = json_decode(file_get_contents('php://input'));

      $contact = array(
        'body' => $data->body,
        'date' => date('Y-m-d', time()),
        'email' => $data->email,
        'id' => $data->messageId,
        'subject' => $data->subject,
      );

      array_push($store['contacts'], $contact);

      file_put_contents('store.json', json_encode($store, JSON_PRETTY_PRINT));

      $msg = 'From: ' . $data->email . "\n\r";
      $msg .= 'Message: ' . $data->body;

      mail('j@hem.rocks', 'New Contact: ' . $data->subject, wordwrap($msg));

      echo 'OK';
    }

    else if ($_GET['hem-cmd'] === 'react-inquiry') {
      $data = json_decode(file_get_contents('php://input'));

      $contact = array(
        'body' => $data->body,
        'date' => date('Y-m-d', time()),
        'email' => $data->email,
        'id' => $data->messageId,
        'subject' => $data->subject,
      );

      array_push($store['reactInquiries'], $contact);

      file_put_contents('store.json', json_encode($store, JSON_PRETTY_PRINT));

      $msg = 'From: ' . $data->email . "\n\r";
      $msg .= 'Message: ' . $data->body;

      mail('j@hem.rocks', 'New Contact: ' . $data->subject, wordwrap($msg));

      echo 'OK';
    }

    else if ($_GET['hem-cmd'] === 'made-with-sl') {
      $data = json_decode(file_get_contents('php://input'));

      $contact = array(
        'body' => $data->body,
        'date' => date('Y-m-d', time()),
        'email' => $data->email,
        'id' => $data->messageId,
        'subject' => $data->subject,
      );

      array_push($store['reactInquiries'], $contact);

      file_put_contents('store.json', json_encode($store, JSON_PRETTY_PRINT));

      $msg = 'From: ' . $data->email . "\n\r";
      $msg = 'Interest: ' . $data->subject . "\n\r";
      $msg .= 'Message: ' . $data->body;

      mail('j@hem.rocks', 'New Made with SL', wordwrap($msg));

      echo 'OK';
    }

    else if ($_GET['hem-cmd'] === 'cookie-approval') {
      $data = json_decode(file_get_contents('php://input'));

      $cookieApproval = array(
        'date' => date('Y-m-d', time()),
        'approval' => $data->approval,
        'cookieName' => $data->cookieName,
      );

      array_push($store['cookieApprovals'], $cookieApproval);

      file_put_contents('store.json', json_encode($store, JSON_PRETTY_PRINT));

      echo 'OK';
    }
  }
}
