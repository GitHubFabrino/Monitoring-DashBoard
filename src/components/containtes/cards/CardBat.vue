<template>
   <a href="#" class="block rounded-lg p-4 shadow-gray-400 shadow-blue-200 bg-[#e0e0e048] w-[30%] hover:bg-blue-100 mt-5">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="h-56 w-full rounded-md object-cover"
        />

        <div class="mt-2">
          <dl>
            <div>


              <dd class="text-sm text-gray-500">{{parc}}</dd>
            </div>

            <div>

              <dd class="font-medium">{{nomBatterie}}</dd>
            </div>
          </dl>

          <div class="mt-6 flex items-center gap-8 text-xs">
            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                class="size-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>

              <div class="mt-1.5 sm:mt-0">
                <p class="text-gray-500">Capacité</p>

                <p class="font-medium">{{capacite}} Ah</p>
              </div>
            </div>

            <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <svg
                class="size-4 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>

              <div class="mt-1.5 sm:mt-0">
                <p class="text-gray-500">Tension Nominal</p>

                <p class="font-medium">{{ tension}} V</p>
              </div>
            </div>
          </div>
        </div>
      </a>
</template>

<script setup>
const props = defineProps({
    parc: {
      type: String, 
      required: true, 
    },
    nomBatterie: {
      type: String, 
      required: true, 
    },
    capacite: {
      type: String, 
      required: true, 
    },
    tension: {
      type: String, 
      required: true, 
    },

  });
</script>

<style scoped>

</style>