<script setup lang="ts">
import BaseInput from "@/UI/Form/Base/BaseInput.vue";
import DefaultModal from "@/features/Modal/UI/DefaultModal.vue";
import CloseIcon from "@/UI/Icons/Shared/CloseIcon.vue";
import BubbleButton from "@/UI/Buttons/BubbleButton.vue";
import {Modal} from "@/features/Modal";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import apiMedialibService from "@/services/api/medialib/apiMedialibService";
import type {MediaLibTypes} from "@/services/api/medialib/types/MediaLibTypes";

const {id, currentName} = defineProps<{
  id: number | string;
  currentName: string;
}>();

const state = defineModel<boolean>({
  required: true
});

const queryClient = useQueryClient();

const {mutate: rename} = useMutation({
  mutationKey: ['renameFolder'],
  mutationFn: async ($event: SubmitEvent) => {
    const response = await apiMedialibService.renameFolder(id);

    if (response.message !== 'OK') {
      throw new Error(response.message);
    }

    queryClient.setQueryData(['mediaLib'], (oldData: MediaLibTypes[]) => {
      const itemIndex = oldData.findIndex(item => item.id === id);
      if (itemIndex === -1) throw new Error('Медиатека не найдена');

      const newData = [...oldData];

      const data = Object.fromEntries(
          new FormData($event.target as HTMLFormElement).entries()
      ) as {newName: string};

      newData[itemIndex] = {
        ...newData[itemIndex],
        name: data.newName
      }

      return newData;
    });

    state.value = false;
  }
})
</script>

<template>
  <Modal v-model="state" :use-transition="false">
    <DefaultModal class="modal">
      <div class="heading">
        <h1 class="title">Переименовать</h1>
        <div class="close" @click="state = false">
          <CloseIcon class="icon" />
        </div>
      </div>

      <form @submit.prevent="rename($event)">
        <BaseInput :value="currentName" name="newName" class="input" />

        <div class="controls">
          <BubbleButton class="confirm" :design="'active'">
            Сохранить
          </BubbleButton>
        </div>
      </form>
    </DefaultModal>
  </Modal>
</template>

<style scoped lang="scss">
.modal {
  width: 372px;
  display: flex;
  flex-direction: column;

  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .close {
      padding: 8px;
      transform-origin: center center;

      &:hover {
        transform: scale(1.04);
      }

      .icon {
        width: 24px;
        height: 24px;
        fill: var(--white);
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .input {
      font-weight: 500;
    }

    .controls {
      width: 100%;

      .confirm {
        margin-left: auto;
        height: 48px;
        padding: 0 32px;
        font-size: 1rem;

        &:hover {
          scale: 1.04;
        }

        &:active {
          scale: 1;
        }
      }
    }
  }
}
</style>