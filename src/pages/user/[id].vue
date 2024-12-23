<script setup lang="ts">
import {computed, inject, ref} from "vue";
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import EntityInfoHeaderTitle from "@/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue";
import EntityInfoHeaderDot from "@/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue";
import {useRoute} from "vue-router";
import GeneralGradientSection from "@/UI/Blocks/GeneralGradientSection.vue";
import SubscribeToArtistButton from "@/UI/Buttons/SubscribeButton.vue";
import ThreeDots from "@/UI/Icons/Shared/ThreeDots.vue";
import EntitiesSectionWithHeading from "@/UI/Blocks/EntitiesSectionWithHeading.vue";
import MusicCard from "@/UI/Elements/MusicCard.vue";
import PlayHeader from "@/UI/Blocks/PlayHeader.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const isMyProfile = computed(() => {
  return false;
});

const route = useRoute();
const layoutScrollY = inject('layoutScrollY', ref(0));

const tooltip = computed(() => {
  return {
    content: `Открыть контекстное меню: Username`
  }
});

function linkToCurrentUserRoute(push: string) {
  return (route.path + push).replace(/\/{2,}/g, '/');
}

const currentList = [
  {
    id: 1,
    name: 'Плейлист #1',
    image: 'https://i.scdn.co/image/ab67616d00001e028863bc11d2aa12b54f5aeb36',
    description: 'Плейлист #1',
    color: '#6c2d2d',
    type: 'Playlist'
  }
]

</script>

<template>
  <div class="layout">
    <PlayHeader
      :mask="null"
      :scroll-y="layoutScrollY"
      :passing-height="150"
      class="play-header"
    >
      <span class="name">Username</span>
    </PlayHeader>

    <EntityInfoHeader class="info-header" :image="null" :mask="null" type="User">
      <span class="type">Профиль</span>
      <EntityInfoHeaderTitle>
        Username
      </EntityInfoHeaderTitle>
      <div class="additional">
        <RouterLink :to="linkToCurrentUserRoute('/followers')" class="subscribers">
          {{t('social.subscribers', 2)}}
        </RouterLink>
        <EntityInfoHeaderDot />
        <RouterLink :to="linkToCurrentUserRoute('/following')" class="subscriptions">
          {{t('social.subscriptions', 2)}}
        </RouterLink>
      </div>
    </EntityInfoHeader>

    <GeneralGradientSection class="gradient-controls" :bg-color="null">
      <SubscribeToArtistButton
        v-if="!isMyProfile"
        :is-subscribed="false"
        class="subscribe-button"
      />

      <button v-tooltip="tooltip" class="etc">
        <ThreeDots class="icon" />
      </button>
    </GeneralGradientSection>

    <div class="other-info-container">
      <EntitiesSectionWithHeading
        naming="Открытые плейлисты"
        :href="linkToCurrentUserRoute('/playlists')"
      >
        <MusicCard
          v-for="entity in currentList"
          :id="entity.id"
          :key="entity.id"
          :image="entity.image"
          :color="entity.color"
          :type="'Playlist'"
          :name="entity.name"
        >
          Username
        </MusicCard>
      </EntitiesSectionWithHeading>

      <EntitiesSectionWithHeading
        naming="Недавние прослушано"
        :href="linkToCurrentUserRoute('/playlists')"
      >
        <MusicCard
          v-for="entity in currentList"
          :id="entity.id"
          :key="entity.id"
          :image="entity.image"
          :color="entity.color"
          :type="'Artist'"
          :name="entity.name"
        >
          Исполнитель
        </MusicCard>
      </EntitiesSectionWithHeading>

      <EntitiesSectionWithHeading
        naming="Подписчики"
        :href="linkToCurrentUserRoute('/playlists')"
      >
        <MusicCard
          v-for="entity in currentList"
          :id="entity.id"
          :key="entity.id"
          :image="entity.image"
          :color="entity.color"
          :type="'User'"
          :name="entity.name"
        >
          Username
        </MusicCard>
      </EntitiesSectionWithHeading>

      <EntitiesSectionWithHeading
        naming="Уже подписаны"
        :href="linkToCurrentUserRoute('/playlists')"
      >
        <MusicCard
          v-for="entity in currentList"
          :id="entity.id"
          :key="entity.id"
          :image="entity.image"
          :color="entity.color"
          :type="'User'"
          :name="entity.name"
        >
          Username
        </MusicCard>
      </EntitiesSectionWithHeading>
    </div>
  </div>
</template>

<style scoped lang="scss">
.play-header span {
  font-size: 1.5rem;
  font-weight: 700;
}

.info-header {
  .type {
    font-size: .875rem;
    font-weight: 500;
  }
  .additional {
    font-size: .875rem;

    a {
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.gradient-controls {

  .subscribe-button {
    margin-right: calc(var(--content-spacing) + 8px);
  }

  .etc {
    background: none;
    border: none;
    height: 32px;
    width: 32px;
    cursor: pointer;

    &:hover {
      scale: 1.04;

      .icon {
        fill: var(--white);
      }
    }

    &:active {
      scale: 1;

      .icon {
        opacity: .5;
      }
    }

    .icon {
      fill: var(--text-soft);
    }
  }
}

.other-info-container {
  padding: 0 var(--content-spacing);
}
</style>