<script setup lang="ts">
import type { UserProfile } from '@spotify/web-api-ts-sdk'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Tippy } from 'vue-tippy'
import { sdk } from '@/services/sdk'
import PlayHeader from '@/shared/UI/Blocks/PlayHeader.vue'
import SubscribeToArtistButton from '@/shared/UI/Buttons/SubscribeButton.vue'
import EntityInfoHeader from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeader.vue'
import EntityInfoHeaderTitle from '@/shared/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue'
import HandleEntityLayoutStates from '@/shared/UI/Elements/HandleEntityLayoutStates.vue'
import MusicCard from '@/shared/UI/Elements/MusicCard.vue'
import EntitiesSectionWithHeading from '@/shared/UI/EntityPageElements/EntitiesSectionWithHeading.vue'
import GeneralGradientSection from '@/shared/UI/EntityPageElements/GeneralGradientSection.vue'
import ThreeDots from '@/shared/UI/Icons/ThreeDots.vue'
import { getMaskColor } from '@/shared/utils/colors/getMaskColor'
import getImageFromEntity from '@/shared/utils/image/getImageFromEntity'

const { t } = useI18n()
const route = useRoute('/user/[id]')
const queryClient = useQueryClient()
const layoutScrollY = inject('layoutScrollY', ref(0))

const routeId = computed(() => route.params.id)

function getCurrentUserData() {
  return queryClient.getQueryData<UserProfile>(['currentUser'])
}

async function fetchUserData() {
  return sdk.users.profile(route.params.id)
}

const { data: user, isLoading, isError } = useQuery({
  queryKey: ['user', routeId],
  queryFn: async () => {
    const data = await fetchUserData()
    const color = await getMaskColor(data)

    return { ...data, maskColor: color }
  },
  staleTime: Infinity,
  maxPages: 3,
})

const { data: followedArtists } = useQuery({
  queryKey: ['currentUserFollowedArtists'],
  queryFn: () => sdk.currentUser.followedArtists('', 10),
  staleTime: Infinity,
})

const currentMaskColor = computed(() => {
  return user.value!.maskColor
})
const isCurrentUser = computed(() => {
  const currentUserData = getCurrentUserData()

  return currentUserData!.id === routeId.value
})
const currentProfilePicture = computed(() => {
  if (!user.value || !user.value.images.length) {
    return null
  }
  return user.value.images[0].url
})

function linkToCurrentUserRoute(push: string) {
  return (route.path + push).replace(/\/{2,}/g, '/')
}
</script>

<template>
  <HandleEntityLayoutStates
    :is-fetching="isLoading"
    :is-error="isError"
    entity="user"
  >
    <div v-if="user" class="layout">
      <PlayHeader
        :mask="currentMaskColor"
        :scroll-y="layoutScrollY"
        :passing-height="150"
        class="play-header"
      >
        <span class="name">{{ user.display_name }}</span>
      </PlayHeader>

      <EntityInfoHeader
        class="info-header"
        :images="currentProfilePicture ? [{ url: currentProfilePicture, width: 300, height: 300 }] : []"
        :mask="currentMaskColor"
        type="user"
      >
        <span class="type">{{ t('user.title') }}</span>
        <EntityInfoHeaderTitle>
          {{ user.display_name }}
        </EntityInfoHeaderTitle>
        <div class="additional">
          <RouterLink :to="linkToCurrentUserRoute('/followers')" class="subscribers">
            {{ t('social.subscribers', user.followers.total) }}
          </RouterLink>
        </div>
      </EntityInfoHeader>

      <GeneralGradientSection class="gradient-controls" :bg-color="currentMaskColor">
        <SubscribeToArtistButton
          v-if="!isCurrentUser"
          :is-subscribed="false"
          class="subscribe-button"
        />

        <Tippy :content="t('music-actions.moreOptionsFor', [user.display_name])">
          <button class="etc">
            <ThreeDots class="icon" />
          </button>
        </Tippy>
      </GeneralGradientSection>

      <div v-if="followedArtists && followedArtists.artists" class="other-info-container">
        <EntitiesSectionWithHeading
          :naming="t('user.subscriptions')"
          :href="linkToCurrentUserRoute('/playlists')"
        >
          <MusicCard
            v-for="entity in followedArtists.artists.items"
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
  </HandleEntityLayoutStates>
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
