<template>
  <nav class="navbar">
    <alert />
    <div class="container navbar__inner">
      <nuxt-link class="navbar__logo" to="/"></nuxt-link>

      <div class="navbar__user-menu" v-if="$auth.loggedIn">
        Howdy
        <nuxt-link
          class="font-bold"
          :to="{
            name: 'u-username',
            params: { username: $auth.user.username }
          }"
        >
          /r/{{ $auth.user.username }}
        </nuxt-link>
        <nuxt-link class="text-xs text-gray-700" to="/settings">
          (settings)
        </nuxt-link>
        <span class="font-thin">|</span>
        <nuxt-link to="/notifications">
          Notifications ({{ ureadsCount }})
        </nuxt-link>
        <span class="font-thin">|</span>
        <a href="#" class="cursor-pointer" @click="logout">Logout</a>
      </div>

      <div class="navbar__user-menu" v-else>
        Want to join?
        <nuxt-link :to="{ name: 'auth-signin' }">Log in</nuxt-link> or
        <nuxt-link :to="{ name: 'auth-signup' }">Signup</nuxt-link>
        in a seconds.
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$echo
        .private("App.Models.User." + this.$auth.user.id)
        .notification(notification => {
          const audio = new Audio("/notification.mp3");
          audio.play();

          this.$store.commit("notification/UNSHIFT_NOTIFICATION", notification);
        });
    }
  },
  beforeDestroy() {
    if (this.$auth.loggedIn)
      this.$echo.leave("App.Models.User." + this.$auth.user.id);
  },
  methods: {
    logout() {
      if (!confirm("Sure to logout?")) return;
      this.$auth.logout();
    }
  },
  computed: mapGetters("notification", ["ureadsCount"])
};
</script>
