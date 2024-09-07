<template>
  <ul class="flex flex-wrap items-center text-secondary gap-1.5 md:gap-2 py-4 md:py-6 px-2 md:px-4 text-xs">
    <li>
      <button
        class="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border rounded-full
        disabled text-purple-700 border-purple-700 focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400"
      >
        <svg fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
          <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z" />
        </svg>
        <span class="ml-1">Filters</span>
      </button>
    </li>

    <!-- by's list -->
    <li class="relative">
      <div :class="selectedFilters.by?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']" @click="showBy = !showBy">
        <div class="ml-3 mr-2 font-medium"> {{ selectedFilters.by }}</div>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <div v-show="showBy" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[160px] dropdown">
        <ul class="py-2 text-sm" @click="showBy = false">
          <li v-for="(by, i) in orderBy" :key="i" class="cursor-pointer">
            <span class="dropdown-item" @click="selectedFilters.by = by">
              {{ by }}
            </span>
          </li>
        </ul>
      </div>
    </li>

    <!-- order's list -->
    <li class="relative">
      <div :class="selectedFilters.order?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']" @click="showOrder = !showOrder">
        <div class="ml-3 mr-2 font-medium"> {{ selectedFilters.order }}</div>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <div v-show="showOrder" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
        <ul class="py-2 text-sm" @click="showOrder = false">
          <li v-for="(order, i) in asc_desc" :key="i" class="cursor-pointer">
            <span class="dropdown-item" @click="selectedFilters.order = order">
              {{ order }}
            </span>
          </li>
        </ul>
      </div>
    </li>

    <!-- Agency's list -->
    <li class="relative">
      <div :class="selectedFilters.agency?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']" @click="showAgency = !showAgency">
        <div class="ml-3 mr-2 font-medium">
          <span v-if="selectedFilters.agency">{{ selectedFilters.agency }}</span>
          <span v-else>All agency</span>
        </div>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
      <div v-show="showAgency" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
        <ul class="py-2 text-sm" @click="showAgency = false">
          <li class="border-b border-color">
            <span class="dropdown-item" @click="selectedFilters.agency = ''">
              All agency
            </span>
          </li>
          <li v-for="(agency, i) in agencies" :key="i" class="cursor-pointer">
            <span class="dropdown-item" @click="selectedFilters.agency = agency">
              {{ agency }}
            </span>
          </li>
        </ul>
      </div>
    </li>

    <!-- Validity's list -->
    <li class="relative">
      <div :class="selectedFilters.validity?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']" @click="showValidity = !showValidity">
        <div class="ml-3 mr-2 font-medium">
          <span v-if="selectedFilters.validity">{{ selectedFilters.validity }}</span>
          <span v-else>All validity</span>
        </div>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
  
      <div v-show="showValidity" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
        <ul class="py-2 text-sm" @click="showValidity = false">
          <li class="border-b border-color">
            <span class="dropdown-item" @click="selectedFilters.validity = ''">
              All validity
            </span>
          </li>
          <li v-for="(validity, i) in validities" :key="i" class="cursor-pointer">
            <span class="dropdown-item" @click="selectedFilters.validity = validity">
              {{ validity }}
            </span>
          </li>
        </ul>
      </div>
    </li>

    <!-- Service_type's list -->
    <li class="relative">
      <div :class="selectedFilters.service_type?'bg-highlight':''" class="flex justify-between py-1 px-3 rounded-lg border border-color font-['roboto']" @click="showService_type = !showService_type">
        <div class="ml-3 mr-2 font-medium">
          <span v-if="selectedFilters.service_type">{{ selectedFilters.service_type }}</span>
          <span v-else>All Type</span>
        </div>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
  
      <div v-show="showService_type" class="over-y absolute mt-1 z-10 divide-y divide-[#dadce0] w-32 max-h-[100px] dropdown">
        <ul class="py-2 text-sm" @click="showService_type = false">
          <li class="border-b border-color">
            <span class="dropdown-item" @click="selectedFilters.service_type = ''">
              All type
            </span>
          </li>
          <li v-for="(service_type, i) in service_types" :key="i" class="cursor-pointer">
            <span class="dropdown-item" @click="selectedFilters.service_type = service_type">
              {{ service_type }}
            </span>
          </li>
        </ul>
      </div>
    </li>

    <!-- reset -->
    <li @click="resetFilter">
      <button type="button" class="font-medium text-sm hover:text-danger">Clear all</button>
    </li>
  </ul>
</template>

<script>
import Agencies from '@/Database/Agencies.js'
import Validities from "@/Database/Validities.js"
import Service_types from "@/Database/Service_types.js"

export default {
  props: {
    orderBy: {
      type: Array,
      default: ['admin_name', 'agency', 'created_at', 'credit', 'debit', 'price', 'user_name', 'service_name', 'validity'],
    },
  },
  data() {
    return {
      agencies: Agencies,
      validities: Validities,
      service_types: Service_types,
      // order_by: ['admin_name', 'agency', 'created_at', 'credit', 'debit', 'price', 'user_name', 'service_name', 'validity'],
      asc_desc: ['asc', 'desc'],

      selectedFilters: {
        by: 'created_at',
        order: 'desc',
        agency: '',
        validity: '',
        service_type: '',
      },
      showBy: false,
      showOrder: false,
      showAgency: false,
      showService_type: false,
      showValidity: false,
    }
  },

  mounted() {
    this.$watch(
      () => this.selectedFilters,
      this.setFilters,
      { 
        immediate: true,
        deep: true
      }
    )
  },

  methods: {
    resetFilter() {
      this.selectedFilters.by = 'created_at'
      this.selectedFilters.order = 'desc'
      this.selectedFilters.agency = ''
      this.selectedFilters.validity = ''
      this.selectedFilters.service_type = ''
      this.$emit('resetFilters')
    },

    setFilters() {
      this.$emit('setFilters', this.selectedFilters)
    }
  }
}
</script>