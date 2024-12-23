<script setup lang="ts">
import readableTime from "@/shared/utils/format/readableTime";
import EntityInfoHeader from "@/UI/Elements/EntityInfoHeader.vue";
import type {Playlist} from "@/services/types/Entities/Playlist";
import LazyImage from "@/UI/Elements/LazyImage.vue";
import {computed} from "vue";
import EntityInfoHeaderTitle from "@/UI/Elements/EntityInfoHeader/EntityInfoHeaderTitle.vue";
import EntityInfoHeaderDot from "@/UI/Elements/EntityInfoHeader/EntityInfoHeaderDot.vue";
import {useI18n} from "vue-i18n";

interface Props {
  image: string | null;
  mask: string | null;
  name: string;
  creators: Playlist['creators'],
  tracksAmount: number;
  totalDuration: number;
}

const {t} = useI18n();

const {creators} = defineProps<Props>();

const creator = computed(() => {
  return creators[0];
});

</script>

<template>
  <EntityInfoHeader class="playlist_about" :image :mask type="Playlist">
    <span class="type">{{t('entities.playlist')}}</span>

    <EntityInfoHeaderTitle>
      {{name}}
    </EntityInfoHeaderTitle>

    <div class="other-info">
      <div class="creator">
        <RouterLink
          :to="`/${creator.type.toLowerCase()}/${creator.id}`"
          class="link"
          draggable="false"
        >
          <LazyImage
            v-if="creator.avatar"
            :image="creator.avatar"
            class="avatar"
          />

          <span>
            {{creators[0].name}}
          </span>
        </RouterLink>
      </div>
      <EntityInfoHeaderDot />
      <div class="quantity">
        {{ t('plurable-entities.track', tracksAmount).toLowerCase() }}, примерно {{ readableTime(totalDuration) }}
      </div>
    </div>
  </EntityInfoHeader>
</template>

<style scoped lang="scss">
.playlist_about {
  user-select: none;

  .type {
    font-size: .875em;
    font-weight: 500;
  }

  .artists {
    color: var(--text-soft);
    font-size: .875em;
    font-weight: 500;
    line-height: normal;
    overflow: hidden;
    text-align: left;
    width: 100%;
    word-break: break-word;
    white-space: nowrap;
  }

  .other-info {
    display: flex;
    align-items: center;
    white-space: nowrap;

    .link {
      display: flex;
      align-items: center;
      gap: 4px;
      user-select: none;

      &:hover {

        span {
          text-decoration: underline 1px;
        }
      }

      .avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }

      span {
        font-weight: 700;
        font-size: .875rem;
        color: var(--white);
        line-height: 1;
      }
    }

    span, .quantity {
      color: var(--text-soft);
      font-size: .875em;
      font-weight: 500;
    }

    & > span {
      margin: 0 4px;
    }
  }
}
</style>