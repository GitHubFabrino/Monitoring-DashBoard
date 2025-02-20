<template>
  <div
    class="bg-[#f6f8fa] w-full h-full shadow-md shadow-gray-400 rounded-md p-5 overflow-hidden"
  >
    <div
      class="flex justify-between items-center p-[10px] border-b border-gray-300"
    >
      <h3 class="font-semibold w-[60%] text-[var(--primary-color)]">
        Estimation des performances :
        {{
          show.selectCard.batterie_Info.nom +
          ` ` +
          show.selectCard.batterie_Info.technologie
        }}
      </h3>
      <div
        class="w-[40px] h-[40px] flex justify-center items-center"
        @click="toggle()"
      >
        <a
          class="inline-block rounded-full border border-indigo-600 bg-indigo-600 p-1 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden"
          href="#"
        >
          <svg
            class="h-4 w-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
    <div>
      <div class="flex justify-around">
        <CardBat
          :parc="show.selectCard.batterie_Info.parc.nom_parc"
          :nomBatterie="
            show.selectCard.batterie_Info.nom +
            ` ` +
            show.selectCard.batterie_Info.technologie
          "
          :capacite="show.selectCard.batterie_Info.capacite_nominal"
          :tension="show.selectCard.batterie_Info.tension_nominale"
          :image="show.selectCard.batterie_Info.file"
          :id="show.selectCard.batterie_Info.id"
        />
        <div
          class="w-[70%] flex flex-col items-center p-5 relative h-[400px]"
          v-if="show.showPrediction"
        >
          <div
            class="w-[100%] overflow-hidden bg-white shadow sm:rounded-lg h-[350px] w-full survoler"
            @mouseover="showHiddenDiv"
            @mouseleave="hideHiddenDiv"
          >
            <div
              class="max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg h-[350px] w-full survoler"
            >
              <div class="border-t border-gray-200 p-4">
                <dl>
                  <div class="px-4 py-4 bg-gray-50 flex justify-between">
                    <div class="w-[25%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              width="30px"
                              height="30px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  d="M14 12H8V13.8C8 14.9201 8 15.4802 8.21799 15.908C8.40973 16.2843 8.71569 16.5903 9.09202 16.782C9.51984 17 10.0799 17 11.2 17H13C13.9319 17 14.3978 17 14.7654 16.8478C15.2554 16.6448 15.6448 16.2554 15.8478 15.7654C16 15.3978 16 14.9319 16 14V12H14ZM14 12V9M10 9V12M12 21V17M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C12.1678 3 12.3345 3.00459 12.5 3.01365M12 21C16.6326 21 20.4476 17.5 20.9451 13M22 6.01752C22 7.6647 20.6569 9 19 9C17.3431 9 16 7.6647 16 6.01752C16 5.26112 16.6817 4.42759 17.1484 3.90182C17.6981 3.28265 18.9912 2 18.9912 2C18.9912 2 20.3487 3.28265 20.8984 3.90182C21.3652 4.42759 22 5.26112 22 6.01752Z"
                                  stroke="#f2b226"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </g>
                            </svg>
                          </div>
                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Cycles
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{ show.selectCard.cycle_summary.total_cycles }}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-[33%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              fill="#000000"
                              width="30px"
                              height="30px"
                              viewBox="0 0 24 24"
                              id="time-alert"
                              data-name="Flat Line"
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon flat-line"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <circle
                                  id="secondary"
                                  cx="12"
                                  cy="12"
                                  r="9"
                                  style="fill: #5cc417; stroke-width: 2"
                                ></circle>
                                <path
                                  id="primary"
                                  d="M12,21a9,9,0,1,1,9-9"
                                  style="
                                    fill: none;
                                    stroke: #616161;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2;
                                  "
                                ></path>
                                <polyline
                                  id="primary-2"
                                  data-name="primary"
                                  points="10 14 12 12 12 7"
                                  style="
                                    fill: none;
                                    stroke: #616161;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2;
                                  "
                                ></polyline>
                                <line
                                  id="primary-3"
                                  data-name="primary"
                                  x1="17"
                                  y1="13"
                                  x2="17"
                                  y2="16"
                                  style="
                                    fill: none;
                                    stroke: #616161;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2;
                                  "
                                ></line>
                                <line
                                  id="primary-upstroke"
                                  x1="16.95"
                                  y1="20.5"
                                  x2="17.05"
                                  y2="20.5"
                                  style="
                                    fill: none;
                                    stroke: #616161;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2.5;
                                  "
                                ></line>
                              </g>
                            </svg>
                          </div>

                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Temps Charge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                formatTime(
                                  show.selectCard.cycle_summary
                                    .total_charge_time_seconds
                                )
                              }}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-[35%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              fill="#000000"
                              width="30px"
                              height="30px"
                              viewBox="0 0 24 24"
                              id="time-alert"
                              data-name="Flat Line"
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon flat-line"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <circle
                                  id="secondary"
                                  cx="12"
                                  cy="12"
                                  r="9"
                                  style="fill: #ef371f; stroke-width: 2"
                                ></circle>
                                <path
                                  id="primary"
                                  d="M12,21a9,9,0,1,1,9-9"
                                  style="
                                    fill: none;
                                    stroke: #000000;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2;
                                  "
                                ></path>
                                <polyline
                                  id="primary-2"
                                  data-name="primary"
                                  points="10 14 12 12 12 7"
                                  style="
                                    fill: none;
                                    stroke: #000000;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2;
                                  "
                                ></polyline>
                                <line
                                  id="primary-3"
                                  data-name="primary"
                                  x1="17"
                                  y1="13"
                                  x2="17"
                                  y2="16"
                                  style="
                                    fill: none;
                                    stroke: #000000;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2;
                                  "
                                ></line>
                                <line
                                  id="primary-upstroke"
                                  x1="16.95"
                                  y1="20.5"
                                  x2="17.05"
                                  y2="20.5"
                                  style="
                                    fill: none;
                                    stroke: #000000;
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 2.5;
                                  "
                                ></line>
                              </g>
                            </svg>
                          </div>

                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Temps Décharge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                formatTime(
                                  show.selectCard.cycle_summary
                                    .total_discharge_time_seconds
                                )
                              }}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-4 bg-white flex justify-between">
                    <div class="w-[45%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              width="30px"
                              height="30px"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  class="success"
                                  d="m 5 7 v 6 h 3 v -1 c 0 -0.53125 0.210938 -1.039062 0.585938 -1.414062 l 2.414062 -2.414063 v -1.171875 z m 0 0"
                                  fill="#33d17a"
                                ></path>
                                <path
                                  d="m 7 0 c -1 0 -1 1 -1 1 v 1 h -1 s -0.707031 -0.015625 -1.445312 0.355469 c -0.742188 0.371093 -1.554688 1.3125 -1.554688 2.644531 v 8 s -0.015625 0.707031 0.355469 1.449219 c 0.371093 0.738281 1.3125 1.550781 2.644531 1.550781 h 5 v -2 h -5 c -0.554688 0 -1 -0.445312 -1 -1 v -8 c 0 -0.554688 0.445312 -1 1 -1 h 6 c 0.554688 0 1 0.445312 1 1 v 2 h 2 v -2 c 0 -1.332031 -0.8125 -2.273438 -1.550781 -2.644531 c -0.742188 -0.371094 -1.449219 -0.355469 -1.449219 -0.355469 h -1 v -1 c 0 -1 -1 -1 -1 -1 z m 6 8 v 0.007812 c -0.265625 -0.003906 -0.519531 0.101563 -0.707031 0.285157 l -3 3 c -0.1875 0.1875 -0.292969 0.441406 -0.292969 0.707031 v 1 h 3.132812 l -0.964843 1.445312 c -0.105469 0.164063 -0.164063 0.359376 -0.160157 0.554688 h -0.007812 v 1 h 1 v -0.003906 c 0.265625 0 0.519531 -0.101563 0.707031 -0.289063 l 3 -3 c 0.1875 -0.1875 0.289063 -0.441406 0.289063 -0.707031 h 0.003906 v -1 h -3.128906 l 0.960937 -1.445312 c 0.109375 -0.164063 0.167969 -0.359376 0.167969 -0.554688 v -1 z m 0 0"
                                  fill="#2e3434"
                                ></path>
                              </g>
                            </svg>
                          </div>

                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Tension de Charge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                show.selectCard.cycle_summary.avg_charge_voltage.toFixed(
                                  2
                                )
                              }}
                              V
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-[47%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-red-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              width="30px"
                              height="30px"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  class="success"
                                  d="m 5 7 v 6 h 3 v -1 c 0 -0.53125 0.210938 -1.039062 0.585938 -1.414062 l 2.414062 -2.414063 v -1.171875 z m 0 0"
                                  fill="#d13333"
                                ></path>
                                <path
                                  d="m 7 0 c -1 0 -1 1 -1 1 v 1 h -1 s -0.707031 -0.015625 -1.445312 0.355469 c -0.742188 0.371093 -1.554688 1.3125 -1.554688 2.644531 v 8 s -0.015625 0.707031 0.355469 1.449219 c 0.371093 0.738281 1.3125 1.550781 2.644531 1.550781 h 5 v -2 h -5 c -0.554688 0 -1 -0.445312 -1 -1 v -8 c 0 -0.554688 0.445312 -1 1 -1 h 6 c 0.554688 0 1 0.445312 1 1 v 2 h 2 v -2 c 0 -1.332031 -0.8125 -2.273438 -1.550781 -2.644531 c -0.742188 -0.371094 -1.449219 -0.355469 -1.449219 -0.355469 h -1 v -1 c 0 -1 -1 -1 -1 -1 z m 6 8 v 0.007812 c -0.265625 -0.003906 -0.519531 0.101563 -0.707031 0.285157 l -3 3 c -0.1875 0.1875 -0.292969 0.441406 -0.292969 0.707031 v 1 h 3.132812 l -0.964843 1.445312 c -0.105469 0.164063 -0.164063 0.359376 -0.160157 0.554688 h -0.007812 v 1 h 1 v -0.003906 c 0.265625 0 0.519531 -0.101563 0.707031 -0.289063 l 3 -3 c 0.1875 -0.1875 0.289063 -0.441406 0.289063 -0.707031 h 0.003906 v -1 h -3.128906 l 0.960937 -1.445312 c 0.109375 -0.164063 0.167969 -0.359376 0.167969 -0.554688 v -1 z m 0 0"
                                  fill="#2e3434"
                                ></path>
                              </g>
                            </svg>
                          </div>

                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Tension de Décharge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                show.selectCard.cycle_summary.avg_discharge_voltage.toFixed(
                                  2
                                )
                              }}
                              V
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-4 bg-gray-50 flex justify-between">
                    <div class="w-[45%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              height="30px"
                              width="30px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 398.528 398.528"
                              xml:space="preserve"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <g>
                                  <path
                                    style="fill: #059103"
                                    d="M315.232,9.015C311.883,3.276,305.681,0,298.244,0h-91.308c-10.9,0-22.224,7.113-26.93,16.924 L83.17,218.041c-3.162,6.56-2.967,13.518,0.471,19.037c3.463,5.568,9.592,8.811,16.859,8.966l71.662,0.902l-51.877,129.675 c-1.276,3.235-3.959,10.014,0.821,16.981c2.089,3.056,5.674,4.926,9.364,4.926h0.837c6.999,0,11.217-5.308,13.241-7.868 L312.176,180.17c7.153-8.966,4.202-17.013,3.121-19.354c-1.122-2.243-5.625-9.592-17.046-9.592h-53.34l69.8-122.985 C318.37,21.752,318.573,14.729,315.232,9.015z"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Courant de Charge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                show.selectCard.cycle_summary.avg_charge_current.toFixed(
                                  2
                                )
                              }}
                              A
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-[47%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              height="30px"
                              width="30px"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 398.528 398.528"
                              xml:space="preserve"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <g>
                                  <path
                                    style="fill: #911103"
                                    d="M315.232,9.015C311.883,3.276,305.681,0,298.244,0h-91.308c-10.9,0-22.224,7.113-26.93,16.924 L83.17,218.041c-3.162,6.56-2.967,13.518,0.471,19.037c3.463,5.568,9.592,8.811,16.859,8.966l71.662,0.902l-51.877,129.675 c-1.276,3.235-3.959,10.014,0.821,16.981c2.089,3.056,5.674,4.926,9.364,4.926h0.837c6.999,0,11.217-5.308,13.241-7.868 L312.176,180.17c7.153-8.966,4.202-17.013,3.121-19.354c-1.122-2.243-5.625-9.592-17.046-9.592h-53.34l69.8-122.985 C318.37,21.752,318.573,14.729,315.232,9.015z"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Courant de Décharge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                show.selectCard.cycle_summary.avg_discharge_current.toFixed(
                                  2
                                )
                              }}
                              A
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-4 bg-white flex justify-between">
                    <div class="w-[45%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 491.173 491.173"
                              xml:space="preserve"
                              width="64px"
                              height="64px"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  style="fill: #d5d6db"
                                  d="M296.975,275.165V56.156C296.975,25.142,271.834,0,240.82,0h-0.001 c-31.013,0-56.156,25.142-56.156,56.156v219.009c-35.281,19.717-59.149,57.413-59.149,100.703 c0,63.681,51.624,115.305,115.305,115.305c63.683,0,115.307-51.624,115.307-115.305 C356.126,332.578,332.257,294.882,296.975,275.165z"
                                ></path>
                                <path
                                  style="fill: #ebf0f3"
                                  d="M240.82,482.841c-58.985,0-106.974-47.988-106.974-106.974c0-38.711,21.03-74.512,54.882-93.431 l4.266-2.386V56.156c0-26.373,21.453-47.826,47.826-47.826s47.826,21.453,47.826,47.826V280.05l4.266,2.386 c33.852,18.919,54.882,54.72,54.882,93.431C347.793,434.853,299.805,482.841,240.82,482.841z"
                                ></path>
                                <path
                                  style="fill: #e1e6e9"
                                  d="M252.926,56.153c0-6.671-5.433-12.104-12.105-12.104c-6.672,0-12.105,5.434-12.105,12.104v112.749 h24.21V56.153z"
                                ></path>
                                <path
                                  style="fill: #067c04"
                                  d="M275.452,313.601l-6.875-3.851c-9.667-5.415-15.651-15.63-15.651-26.713V168.902h-24.21v114.141 c0,11.078-5.985,21.292-15.648,26.707l-6.913,3.876c-29.308,16.364-44.19,51.695-32.696,85.601 c8.466,24.973,30.928,43.473,57.034,47.163c43.858,6.196,81.579-27.84,81.579-70.522 C312.072,350.08,298.058,326.228,275.452,313.601z"
                                ></path>
                                <g>
                                  <rect
                                    x="317.167"
                                    y="53.12"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="72.418"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="91.72"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="111.017"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="130.32"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="149.637"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="168.94"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="188.217"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="207.519"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="226.796"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="246.098"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                </g>
                              </g>
                            </svg>
                          </div>

                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Température de Charge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                show.selectCard.cycle_summary.avg_charge_temperature.toFixed(
                                  2
                                )
                              }}
                              °C
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-[47%]">
                      <div
                        class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

                        <div class="flex items-center px-2 py-1">
                          <div
                            class="object-cover w-10 h-10 rounded-full flex justify-center items-center"
                          >
                            <svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 491.173 491.173"
                              xml:space="preserve"
                              width="64px"
                              height="64px"
                              fill="#000000"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                <path
                                  style="fill: #d5d6db"
                                  d="M296.975,275.165V56.156C296.975,25.142,271.834,0,240.82,0h-0.001 c-31.013,0-56.156,25.142-56.156,56.156v219.009c-35.281,19.717-59.149,57.413-59.149,100.703 c0,63.681,51.624,115.305,115.305,115.305c63.683,0,115.307-51.624,115.307-115.305 C356.126,332.578,332.257,294.882,296.975,275.165z"
                                ></path>
                                <path
                                  style="fill: #ebf0f3"
                                  d="M240.82,482.841c-58.985,0-106.974-47.988-106.974-106.974c0-38.711,21.03-74.512,54.882-93.431 l4.266-2.386V56.156c0-26.373,21.453-47.826,47.826-47.826s47.826,21.453,47.826,47.826V280.05l4.266,2.386 c33.852,18.919,54.882,54.72,54.882,93.431C347.793,434.853,299.805,482.841,240.82,482.841z"
                                ></path>
                                <path
                                  style="fill: #e1e6e9"
                                  d="M252.926,56.153c0-6.671-5.433-12.104-12.105-12.104c-6.672,0-12.105,5.434-12.105,12.104v112.749 h24.21V56.153z"
                                ></path>
                                <path
                                  style="fill: #ef371f"
                                  d="M275.452,313.601l-6.875-3.851c-9.667-5.415-15.651-15.63-15.651-26.713V168.902h-24.21v114.141 c0,11.078-5.985,21.292-15.648,26.707l-6.913,3.876c-29.308,16.364-44.19,51.695-32.696,85.601 c8.466,24.973,30.928,43.473,57.034,47.163c43.858,6.196,81.579-27.84,81.579-70.522 C312.072,350.08,298.058,326.228,275.452,313.601z"
                                ></path>
                                <g>
                                  <rect
                                    x="317.167"
                                    y="53.12"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="72.418"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="91.72"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="111.017"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="130.32"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="149.637"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="168.94"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="188.217"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="207.519"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="226.796"
                                    style="fill: #3a556a"
                                    width="30.628"
                                    height="8.929"
                                  ></rect>
                                  <rect
                                    x="317.167"
                                    y="246.098"
                                    style="fill: #3a556a"
                                    width="48.492"
                                    height="8.929"
                                  ></rect>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div class="mx-3">
                            <dt class="text-sm font-medium text-gray-500">
                              Température de Décharge
                            </dt>
                            <dd
                              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
                            >
                              {{
                                show.selectCard.cycle_summary.avg_discharge_temperature.toFixed(
                                  2
                                )
                              }}
                              °C
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div
            @mouseover="showHiddenDiv"
            class="absolute overflow-hidden  shadow sm:rounded-lg h-[80%] bg-[#328da836] w-[90%] flex items-center justify-center apparaitre transition-opacity duration-500 ease-in-out top-1/2 transform -translate-y-1/2"
            :class="{ 'opacity-100': isHovered, 'opacity-0': !isHovered }"
          >
            <a
              class="inline-block rounded-sm border border-[#fb7a58] bg-[#fb7a58] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#fb7a58] focus:ring-3 focus:outline-hidden"
              href="#"
              @click="prediction()"
            >
              Performance restant
            </a>
          </div>
        </div>

        <div v-else class="flex justify-around items-center">
          <div class="w-[55%] flex flex-col items-center p-5">
         
            <div
              class="relative flex flex-col items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-[160px] w-[500px]"
            >
              <div
                class="block overflow-hidden md:w-52 h-full flex justify-center items-center"
              >
                <div class="relative size-[70%]">
                  <svg
                    class="size-full -rotate-90"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      class="stroke-current text-gray-200"
                      stroke-width="2"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      class="stroke-current"
                      :class="progressColor"
                      stroke-width="2"
                      :stroke-dasharray="`${progressValue}, 100`"
                      stroke-linecap="round"
                    ></circle>
                  </svg>
                  <div
                    class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2"
                  >
                    <span
                      class="text-center text-2xl font-bold"
                      :class="progressColor"
                      >{{ progressValue }}%</span
                    >
                  </div>
                </div>
              </div>
              <div class="p-4">
                <h4
                  class="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500"
                >
                  État de Santé SOH
                </h4>
                <p
                  class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5"
                >
                  Indique combien de capacité une batterie a conservée par
                  rapport à son état initial.
                </p>
                <span v-if="Math.round(lectureStore.newPredict.predictions.SOH) > 80"
                  class="inline-flex items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="-ms-1 me-1.5 size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p class="text-sm whitespace-nowrap">Bon</p>
                </span>
                <span v-if=" 60 >Math.round(lectureStore.newPredict.predictions.SOH) > 80"
                  class="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="-ms-1 me-1.5 size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                    />
                  </svg>
                  <p class="text-sm whitespace-nowrap">Prudence</p>
                </span>
                <span v-if=" 60 >Math.round(lectureStore.newPredict.predictions.SOH)"
                  class="inline-flex items-center justify-center rounded-full border border-red-500 px-2.5 py-0.5 text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="-ms-1 me-1.5 size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p class="text-sm whitespace-nowrap">Mauvaise</p>
                </span>
              </div>
            </div>

            <div
              class="relative flex flex-col items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-[160px] mt-10 w-[500px]"
            >
              <div
                class="block overflow-hidden md:w-52 h-full flex justify-center items-center"
              >
                <div class="relative size-[70%]">
                  <div
                    class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2"
                  >
                    <span
                      class="text-center text-2xl font-bold text-blue-600 animated-number"
                      >{{ formattedNumber }}</span>
                    <span
                      class="text-center text-sm font-bold text-blue-600 animated-number"
                      >Cycles</span 
                    >
                  </div>
                </div>
              </div>
              <div class="p-4">
                <h4
                  class="text-base font-semibold text-gray-900 mb-2 capitalize transition-all duration-500"
                >
                  Durée de Vie Utile Restante RUL
                </h4>
                <p
                  class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5"
                >
                  Estime le temps restant avant que la batterie ne soit
                  inutilisable.
                </p>
               
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import "primeicons/primeicons.css";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useLectureStore } from "@/stores/lectureStore";
import CardBat from "@/components/containtes/cards/CardBat.vue";
import Spinner from "@/components/containtes/modals/Spinner.vue";

const lectureStore = useLectureStore();
const isHovered = ref(false);
const showHiddenDiv = () => {
  isHovered.value = true;
};
const hideHiddenDiv = () => {
  isHovered.value = false;
};
const batterie = useBatterie();
const show = useShow();

function prediction() {
  show.showPrediction = !show.showPrediction;
}

const selectCard = ref({});
const loading = ref(true);
const progressValue = ref(Math.round(lectureStore.newPredict.predictions.SOH));
const targetNumber = ref(progressValue.value); // Utilisez la valeur de progressValue comme cible
const targetNumber2 = ref(Math.round(lectureStore.newPredict.predictions.RUL)); // Utilisez la valeur de progressValue comme cible

const currentNumber = ref(0);
let progressInterval;
let numberInterval;

const formatTime = (seconds) => {
  const years = Math.floor(seconds / (365 * 24 * 3600));
  const months = Math.floor((seconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
  const days = Math.floor((seconds % (30 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (years > 0) {
    timeString += `${years}A`;
  }
  if (months > 0 || years > 0) {
    timeString += `${months}M`;
  }
  if (days > 0 || months > 0 || years > 0) {
    timeString += `${days}J`;
  }
  if (hours > 0) {
    if (days > 0 || months > 0 || years > 0) {
      timeString += ``;
    }
    timeString += `${hours}h`;
  }
  if (minutes > 0 && hours < 24) {
    timeString += `${minutes}min`;
  }
  if (remainingSeconds > 0 && minutes < 60) {
    timeString += `${remainingSeconds}s`;
  }

  return timeString;
};

const formattedNumber = computed(() => {
  return new Intl.NumberFormat().format(currentNumber.value);
});

const progressColor = computed(() => {
  if (progressValue.value < 50) {
    return "text-red-600";
  } else if (progressValue.value < 80) {
    return "text-yellow-500";
  } else {
    return "text-green-600";
  }
});

const toggle = () => {
  show.showEstimation = !show.showEstimation;
  show.showEstimationDetails = !show.showEstimationDetails;
  show.showPrediction = !show.showPrediction;
};

const startProgressAnimation = () => {
  progressInterval = setInterval(() => {
    if (progressValue.value < targetNumber.value) {
      progressValue.value += 1;
    } else {
      clearInterval(progressInterval);
    }
  }, 50);
};

const startNumberAnimation = () => {
  numberInterval = setInterval(() => {
    if (currentNumber.value < targetNumber2.value) {
      currentNumber.value += 1;
    } else {
      clearInterval(numberInterval);
    }
  }, 10);
};

onMounted(() => {
  console.log('zaza', show.selectCard.cycle_summary);
  show.selectCard.value = batterie.allBatteryData[0];
  setTimeout(() => {
    loading.value = false;
    startProgressAnimation();
    startNumberAnimation();
  }, 2000);
});

onUnmounted(() => {
  clearInterval(progressInterval);
  clearInterval(numberInterval);
});
</script>

<!-- <script setup>
import "primeicons/primeicons.css";
import { ref, onMounted, onUnmounted, computed, watchEffect } from "vue";
import { useShow } from "@/stores/show";
import { useBatterie } from "@/stores/batterieStore";
import { parcStore } from "@/stores/parcStore";
import { useLectureStore } from "@/stores/lectureStore";
import CardBat from "@/components/containtes/cards/CardBat.vue";
import Spinner from "@/components/containtes/modals/Spinner.vue";
const lectureStore =useLectureStore()
const isHovered = ref(false);

const showHiddenDiv = () => {
  isHovered.value = true;
};

const hideHiddenDiv = () => {
  isHovered.value = false;
};
const batterie = useBatterie();
const show = useShow();

function prediction() {
  show.showPrediction = !show.showPrediction;
  // show.showEstimation = !show.showEstimation
  // show.showEstimationDetails = !show.showEstimationDetails
}

const selectCard = ref({});
const loading = ref(true);
const progressValue = ref(lectureStore.newPredict.predictions.SOH);
const targetNumber = ref(0);
const currentNumber = ref(0);
let progressInterval;
let numberInterval;

const formatTime = (seconds) => {
  const years = Math.floor(seconds / (365 * 24 * 3600));
  const months = Math.floor((seconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
  const days = Math.floor((seconds % (30 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (years > 0) {
    timeString += `${years}A`;
  }
  if (months > 0 || years > 0) {
    timeString += `${months}M`;
  }
  if (days > 0 || months > 0 || years > 0) {
    timeString += `${days}J`;
  }
  if (hours > 0) {
    if (days > 0 || months > 0 || years > 0) {
      timeString += ``;
    }
    timeString += `${hours}h`;
  }
  if (minutes > 0 && hours < 24) {
    timeString += `${minutes}min`;
  }
  if (remainingSeconds > 0 && minutes < 60) {
    timeString += `${remainingSeconds}s`;
  }

  return timeString;
};
const formattedNumber = computed(() => {
  return new Intl.NumberFormat().format(currentNumber.value);
});

const progressColor = computed(() => {
  if (progressValue.value < 50) {
    return "text-red-600";
  } else if (progressValue.value < 80) {
    return "text-yellow-500";
  } else {
    return "text-green-600";
  }
});

const toggle = () => {
  show.showEstimation = !show.showEstimation;
  show.showEstimationDetails = !show.showEstimationDetails;
  show.showPrediction = !show.showPrediction;
};

const startProgressAnimation = () => {
  progressInterval = setInterval(() => {
    progressValue.value += 1;
    if (progressValue.value >= 100) {
      progressValue.value = 0;
    }
  }, 50);
};

const startNumberAnimation = () => {
  numberInterval = setInterval(() => {
    if (currentNumber.value < targetNumber.value) {
      currentNumber.value += 1;
    } else {
      clearInterval(numberInterval);
    }
  }, 10);
};

onMounted(() => {

  console.log('zaza', show.selectCard.cycle_summary);
  show.selectCard.value = batterie.allBatteryData[0];
  setTimeout(() => {
    loading.value = false;
    startProgressAnimation();
  }, 2000);
});

onMounted(() => {
  console.log('zaza', show.selectCard.cycle_summary);
  show.selectCard.value = batterie.allBatteryData[0];
  targetNumber.value = 2543;
  setTimeout(() => {
    loading.value = false;
    startNumberAnimation();
  }, 2000);
});

onUnmounted(() => {
  clearInterval(progressInterval);
  clearInterval(numberInterval);
});

// watchEffect(()=>{
//   show.showPrediction = !show.showPrediction
// })


</script> -->

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.animated-number {
  transition: opacity 0.5s, transform 0.5s;
  display: inline-block;
}
.apparaitre {
  opacity: 0;
}
</style>
