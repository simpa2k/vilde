<?php 
require_once 'core/init.php';

header('Content-Type: text/html; charset=utf-8');
header("Content-Security-Policy: script-src 'self'");
header('Strict-Transport-Security: max-age=3600');

if ( Input::exists() ) {
    if ( Token::check( Input::get( 'token' ) ) ) {
        
        $validate = new Validate();
        $validation = $validate->check($_POST, array(
            'username' => array( 'required' => true ),
            'password' => array( 'required' => true )
        ));
        
        if ( $validation->passed() ) {
            $user = new User();
            $login = $user->login( Input::get( 'username' ), Input::get( 'password' ) );
            
            if ( $login ) {
                Redirect::to('admin');
            } else {
                echo '<p>Sorry, login failed</p>';
            }
        } else {
            foreach( $validation->errors() as $error ) {
                echo $error, '</br>';
            }
        }
    }
}

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Admin Login</title>
        <link rel="stylesheet" type="text/css" href="static/css/admin_login.css">
    </head>
    <body>
        <div id="background"></div>
        <div id="main">
            <form action="" method="post">
                <div class="field">
                    <!--<label for="username">Användarnamn</label>-->
                    <input type="text" name="username" id="username" placeholder="Användarnamn" autocomplete="off">
                </div>
                
                <div class="field">
                    <!--<label for="password">Lösenord</label>-->
                    <input type="password" name="password" id="password" placeholder="Lösenord" autocomplete="off">
                </div>
                
                <input type="hidden" name="token" value="<?php echo Token::generate(); ?>">
                <input id="submit" type="submit" value="Logga in">
            </form>
        </div>
    </body>
</html>