
<script>

</script>

<template>
<footer>
    <div class="dev">
        <h4>Desenvolvedores:</h4> 
        <ul>
            <li class="prikito"> Pedro Gabriel Gonçalves</li>
            <li> Maria Clara Pavanello Giareta</li>
        </ul>
    </div>
    <div class="redes">
            <h4>Redes Sociais</h4>
                  <ul class="icons">
        <li><span class="mdi mdi-facebook"></span></li>
        <li><span class="mdi mdi-instagram"></span></li>
        <li><span class="mdi mdi-twitter"></span></li>
      </ul>
  <p>LenteLatina © 2025</p>
           
    </div>
   
</footer>
</template>
<style scoped>
footer{
    background-color: #0D1321;
    color: #F9FADC;
    display: flex;
     justify-content: space-between;
    padding: 3vw 10vw;
    position: relative;

}
footer::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0.5rem;
    left: 0;
    background-color: #F9FADC;
}
.redes{
    text-align: center;
}
.redes ul{
    display: flex;
    justify-content: center;
    margin-top: 1vw;
}
.redes ul{
    gap: 1.5vw;
    margin-bottom: 1vw;
}
li.prikito{
    margin: 1vw 0 0.5vw 0;
}
</style>