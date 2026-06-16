<script setup lang="ts">
import IconBase from '../../components/icons/IconBase.vue'
import YoutubeChannelList from './YoutubeChannelList.vue'
import YoutubeChannelAdd from './YoutubeChannelAdd.vue'
import YoutubeVideoList from './YoutubeVideoList.vue'
</script>

<template>
  <div class="feed">
    <div class="section">
      <!-- <div class="actions">
        <ButtonBase class="small" icon="folder" />
        <ButtonBase class="small" icon="faviconToggle" />
        <ButtonBase class="small" icon="favoriteSearch" />
      </div> -->
      <div class="channels">
        <h2>Channels</h2>
        <Transition mode="out-in">
          <Suspense>
            <YoutubeChannelList />
            <template #fallback>
              <div class="loading">
                Loading
                <IconBase name="loading" />
              </div>
            </template>
          </Suspense>
        </Transition>
      </div>
      <YoutubeChannelAdd />
    </div>
    <div class="section">
      <!-- <div class="actions">
        <ButtonBase class="small" icon="show" />
      </div> -->
      <div class="videos">
        <h2>Videos</h2>
        <Transition mode="out-in">
          <Suspense>
            <YoutubeVideoList />
            <template #fallback>
              <div class="loading">
                Loading
                <IconBase name="loading" />
              </div>
            </template>
          </Suspense>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed {
  display: grid;
  grid-template-columns: 16rem 2fr;
  gap: 0.6rem;
}

h2 {
  font-size: 1rem;
  font-weight: 300;
  border-bottom: 2.5px solid var(--border);
  padding: 0 0.6rem;
  height: var(--header-size);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: var(--element);
}

.section {
  display: flex;
  flex-flow: column;
  gap: 0.6rem;
  max-height: 40rem;
  height: 40rem;
}

.actions {
  display: flex;
  gap: 0.6rem;
}

.channels,
.videos {
  position: relative;
  background-color: var(--element);
  border: 2.5px solid var(--border);
  border-radius: 0.6rem;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  flex: 1;
}

.loading {
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-from {
  transform: translateY(-0.3rem);
}
.v-leave-to {
  transform: translateY(0.3rem);
}
</style>
