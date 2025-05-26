<?php
class MainController {
    public function showHome() {
        include 'views/includes/header.php';
        include 'views/includes/menu.php';
        include 'views/home.php';
        include 'views/includes/footer.php';
    }
}
