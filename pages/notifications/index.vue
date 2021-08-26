<template>
  <div>
    <div class="flex items-center">
      <img src="~/static/images/snoo-1.png" alt="" />
      <h3 class="text-4xl">Notifications</h3>
    </div>

    <div class="flex my-4 space-x-2">
      <form-button @click="notificationMode('all')">
        All ({{ allCount }})
      </form-button>
      <form-button @click="notificationMode('reads')">
        Reads ({{ readsCount }})
      </form-button>
      <form-button @click="notificationMode('unreads')">
        Unreads ({{ ureadsCount }})
      </form-button>
      <form-button @click="$store.dispatch('notification/clearAll')">
        Clear
      </form-button>
    </div>

    <div v-if="notifications.length">
      <div v-for="notification in notifications" :key="notification.id">
        <component
          :is="`notification-${notification.notification_for}`"
          :notification="notification"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: ["auth"],
  head: {
    title: "Notifications"
  },
  computed: mapGetters("notification", [
    "notifications",
    "allCount",
    "readsCount",
    "ureadsCount"
  ]),
  methods: mapActions("notification", ["notificationMode"])
};
</script>
