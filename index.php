<?php include 'header.php'; ?>

<div class="dashboard">
    <div class="dashboard-nav">
        <header>
            <a href="#!" class="menu-toggle"><i class="fas fa-bars"></i></a>
            <a href="#" class="brand-logo"><i class="fas fa-home"></i> <span>Home</span></a>
        </header>
        <nav class="dashboard-nav-list">
            <!-- <a href="#" class="dashboard-nav-item" ><i class="fa-solid fa-list-check"></i><span style="padding: 5px;"> Pick</span> </a> -->
            <a href="#" class="dashboard-nav-item active"><i class="fas fa-tachometer-alt"></i>Dashboard</a>
            <a href="baixaPicklist.php" class="dashboard-nav-item active"><i class="fa-solid fa-camera"></i></i>Baixa Picklist</a>
            <a href="dashboard/dashboardLinha2.php" class="dashboard-nav-item"> <span style="padding: 5px;">LINHA</span> <i class="fa-solid fa-2"></i></a>
            <a href="dashboard/dashboardLinha3.php" class="dashboard-nav-item"> <span style="padding: 5px;">LINHA</span> <i class="fa-solid fa-3"></i></a>
            <a href="dashboard/dashboardLinha4.php" class="dashboard-nav-item"> <span style="padding: 5px;">LINHA</span> <i class="fa-solid fa-4"></i></a>
            <a href="dashboard/dashboardLinha5.php" class="dashboard-nav-item"> <span style="padding: 5px;">LINHA</span> <i class="fa-solid fa-5"></i></a>
            <a href="dashboard/dashboardLinha6.php" class="dashboard-nav-item"> <span style="padding: 5px;">LINHA</span> <i class="fa-solid fa-6"></i></a>
           
            <a href="logout.php" class="dashboard-nav-item"><i class="fas fa-sign-out-alt"></i> Logout </a>
        </nav>
    </div>
    <div class="dashboard-app">
        <header class="dashboard-toolbar">
            <a href="#!" class="menu-toggle"><i class="fas fa-bars"></i></a>
        </header>
        <?php include 'picklist.php'; ?>
    </div>
</div>