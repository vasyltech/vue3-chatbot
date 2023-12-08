<template>
  <div class="cb-header">
    <img
      class="cb-header--img"
      :src="$theme.header.icons.logoImg"
      :alt="$i18n.header.icons.logoAlt"
    />

    <div class="cb-header--title">
      <small>{{ $i18n.header.prompt }}</small> {{ $i18n.name }}
    </div>

    <div class="cb-header--close-button" @click="$emit('close')">
      <img
        :src="$theme.header.icons.closeImg"
        :alt="$i18n.header.icons.closeAlt"
      />
    </div>
  </div>
</template>