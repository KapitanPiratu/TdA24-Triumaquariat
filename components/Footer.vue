<template>
    <div class="footer">

        <div class="links">

            <nuxt-link to="/contact">
                <p>Kontakt</p>
            </nuxt-link>

            <nuxt-link to="/registration_info">
                <p>Podmínky registrace</p>
            </nuxt-link>

            <nuxt-link to="/gdpr">
                <p>GDPR - Zásady ochrany osobních údajů</p>
            </nuxt-link>

        </div>

        <p class="copyright">&#169; Teacher Digital Agency - Všechna práva vyhrazena</p>

    </div>
</template>

<style scoped>
.footer {
    margin-top: 5vh;

    width: 100vw;
    height: 13vh;

    background-color: var(--prussian-blue);

    position: relative;
    bottom: 0;
}

.footer * {
    color: var(--white);
}

.links {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5vw;

    height: auto;
    width: 35vw;

    display: inline-flex;
    justify-content: space-between;
}

.copyright {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5vw;
}
</style>