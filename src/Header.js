export default function Header(){
    return (
    <header id="header" class="flex-row">
    <img src="images/logo.png" alt="logo" width="60" height="60"/>  
    <nav>
      <ul class="flex-row">
        <li><a class="active" href="/recipes">My Recipes</a></li>
        <li><a href="/addrecipe">Add Recipe</a></li>
        <li><a href="/signupin">Sign In</a></li>
      </ul>
      </nav>
  </header>
    );
}