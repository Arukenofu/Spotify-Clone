<script setup lang="ts">
import {computed, inject, ref} from "vue";
import EntityInfoHeader from "@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeader.vue";
import EntityInfoHeaderTitle from "@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue";
import {useRoute} from "vue-router";
import GeneralGradientSection from "@/shared/UI/EntityPageElements/GeneralGradientSection.vue";
import SubscribeToArtistButton from "@/shared/UI/Buttons/SubscribeButton.vue";
import ThreeDots from "@/shared/UI/Icons/ThreeDots.vue";
import EntitiesSectionWithHeading from "@/shared/UI/EntityPageElements/EntitiesSectionWithHeading.vue";
import MusicCard from "@/shared/UI/Elements/MusicCard.vue";
import PlayHeader from "@/shared/UI/Blocks/PlayHeader.vue";
import {useI18n} from "vue-i18n";
import {useQuery, useQueryClient} from "@tanstack/vue-query";
import {sdk} from "@/services/sdk";
import type {UserProfile} from "@spotify/web-api-ts-sdk";
import getImageFromEntity from "@/shared/utils/getImageFromEntity";
import LoadingBlock from "@/shared/UI/Blocks/LoadingBlock.vue";
import getMaskColor from "@/shared/utils/getMaskColor";

const {t} = useI18n();
const route = useRoute('/user/[id]');
const queryClient = useQueryClient();
const layoutScrollY = inject('layoutScrollY', ref(0));

const routeId = computed(() => route.params.id);

function getCurrentUserData() {
  return queryClient.getQueryData<UserProfile>(['currentUser']);
}

async function fetchUserData() {
  const currentUserData = getCurrentUserData();

  if (currentUserData && currentUserData.id === routeId.value) {
    const followedArtists = await sdk.currentUser.followedArtists('', 10);
    queryClient.setQueryData(['currentUserFollowedArtists'], followedArtists);

    return {
      ...currentUserData,
      followedArtists
    };
  }

  return sdk.users.profile(route.params.id);
}

const {data: user, isLoading} = useQuery({
  queryKey: ['user', routeId],
  queryFn: async () => {
    const data = await fetchUserData();
    const color = await getMaskColor(data);

    return {...data, maskColor: color}
  },
  staleTime: Infinity,
  maxPages: 3,
});

const currentMaskColor = computed(() => {
  return user.value!.maskColor;
});
const isCurrentUser = computed(() => {
  const currentUserData = getCurrentUserData();

  return currentUserData!.id === routeId.value;
});
const currentProfilePicture = computed(() => {
  if (!user.value || !user.value.images.length) {
    return null;
  }
  return user.value.images[0].url;
});

const tooltip = computed(() => {
  return {
    content: t('music-actions.moreOptionsFor', ['Username'])
  }
});

function linkToCurrentUserRoute(push: string) {
  return (route.path + push).replace(/\/{2,}/g, '/');
}
</script>

<template>
  <LoadingBlock v-if="isLoading" />

  <div v-if="user" class="layout">
    <PlayHeader
      :mask="currentMaskColor"
      :scroll-y="layoutScrollY"
      :passing-height="150"
      class="play-header"
    >
      <span class="name">{{user.display_name}}</span>
    </PlayHeader>

    <EntityInfoHeader class="info-header" :image="currentProfilePicture" :mask="currentMaskColor" type="user">
      <span class="type">{{t('user.title')}}</span>
      <EntityInfoHeaderTitle>
        {{user.display_name}}
      </EntityInfoHeaderTitle>
      <div class="additional">
        <RouterLink :to="linkToCurrentUserRoute('/followers')" class="subscribers">
          {{t('social.subscribers', user.followers.total)}}
        </RouterLink>
      </div>
    </EntityInfoHeader>

    <GeneralGradientSection class="gradient-controls" :bg-color="currentMaskColor">
      <SubscribeToArtistButton
        v-if="!isCurrentUser"
        :is-subscribed="false"
        class="subscribe-button"
      />

      <button v-tooltip="tooltip" class="etc">
        <ThreeDots class="icon" />
      </button>
    </GeneralGradientSection>

    <div v-if="'followedArtists' in user" class="other-info-container">
      <EntitiesSectionWithHeading
        :naming="t('user.subscriptions')"
        :href="linkToCurrentUserRoute('/playlists')"
      >
        <MusicCard
          v-for="entity in user.followedArtists.artists.items"
          :id="entity.id"
          :key="entity.id"
          :image="getImageFromEntity(entity.images, 1)"
          :mask-loader-image="getImageFromEntity(entity.images, 2)"
          :name="entity.name"
          type="artist"
        />
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
  max-width: var(--content-max-width);
  margin: 0 auto;
}
</style>