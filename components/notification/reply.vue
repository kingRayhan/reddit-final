<template>
  <div
    class="p-2 mb-2"
    :class="{
      'bg-gray-100': notification.read_at,
      'bg-primaryLight': !notification.read_at
    }"
  >
    <div>
      <a href="#">
        <p class="text-gray-600 ">
          {{ notification.responsible.username }} replied on your comment
        </p>
        <p class="text-lg italic">{{ notification.data }}</p>
      </a>
    </div>
    <div>
      <button
        v-if="notification.read_at"
        class="mr-2 text-xs font-bold"
        @click="markAsUnread(notification.id)"
      >
        Mark as unread
      </button>
      <button
        v-if="!notification.read_at"
        class="mr-2 text-xs font-bold"
        @click="markAsRead(notification.id)"
      >
        Mark as read
      </button>
      <button
        class="text-xs font-bold text-red-500"
        @click="destroy(notification.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["notification"],
  methods: {
    ...mapActions("notification", ["markAsRead", "markAsUnread", "destroy"])
  }
};
</script>
