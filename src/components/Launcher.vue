<template>
    <div>
        <div
            class="cb-launcher"
            :class="{ opened: isOpen, hidden: $settings.hideLauncher }"
            @click.prevent="isOpen = !isOpen"
        >
            <div v-if="$store.hasNewMessage && !isOpen" class="cb-notification"></div>

            <img
                v-if="isOpen"
                class="cb-closed-icon"
                :src="$theme.launcher.icons.closeImg"
                :alt="$i18n.launcher.icons.closeAlt"
            />
            <img
                v-else
                class="cb-open-icon"
                :src="$theme.launcher.icons.openImg"
                :alt="$i18n.launcher.icons.openAlt"
            />
        </div>

        <ChatWindow :is-open="isOpen" @close="isOpen = false" />
    </div>
</template>

<script>
import ChatWindow from './ChatWindow.vue';

export default {
    components: {
        ChatWindow
    },
    data() {
        return {
            isOpen: false
        }
    }
}
</script>