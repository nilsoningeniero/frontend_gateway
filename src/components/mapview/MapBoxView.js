import { useLugaresStore } from "@/composables/useLugaresStore";
import { defineComponent, onMounted, ref, watch } from "vue";

import MapboxGl from "mapbox-gl";

export default defineComponent({
  
  name: 'MapBoxView',

  setup() {

    const mapElement = ref<HTMLDivElement>();
    const { isLoading, cardLocation, isCardLocationReady } = useLugaresStore();

    const iniMap = async () => {
      if ( !mapElement.value ) throw new Error("Div Element no existe");
      if ( !cardLocation.value ) throw new Error("Card no Location");
      
      await Promise.resolve();

      const map = new MapboxGl.Map({
        container: mapElement.value,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: cardLocation.value,
        zoom: 15
      });

      //ubicar los carros en el mapa con las coordenadas de la tabla vehciulos

    }

    onMounted(() => {
      if ( isCardLocationReady.value ) return iniMap();
    })

    watch( isCardLocationReady, (newVal ) => {
      if ( isCardLocationReady.value ) return iniMap();
    })

    return {
      isLoading, 
      cardLocation,
      isCardLocationReady,
      mapElement
    }
  }
})


  