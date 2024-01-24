const needHelpContent = [
  {
    question: { en: "What is this about?", de: "Worum geht es hier?" },
    answer: {
      en: (
        <>
          This installation revolves around leveraging data for more informed
          debates. In the context of democracy, data plays an increasingly vital
          role, serving as the foundation for discussions and decisions. The
          station collects your ideas and opinions, automatically analyzes them,
          and presents them in a knowledge graph. It enables to uncover
          information and connections within the data, embodying a playful
          application of Data Literacy and a lived commitment to information
          freedom in the digital age. Presented by Studio Brüll.
        </>
      ),

      de: (
        <>
          Bei dieser Installation geht es um die Nutzung von Daten für besser
          informierte Debatten. Im Rahmen der Demokratie spielen Daten eine
          immer wichtigere Rolle und dienen als Grundlage für Diskussionen und
          Entscheidungen. Die Station sammelt Ihre Ideen und Meinungen,
          analysiert sie automatisch und stellt sie in einem Wissensgraphen dar.
          Sie ermöglicht es, Informationen und Zusammenhänge in den Daten zu
          entdecken und verkörpert eine spielerische Anwendung von
          Datenkompetenz und ein gelebtes Engagement für Informationsfreiheit im
          digitalen Zeitalter. Präsentiert von Studio Brüll.
        </>
      ),
    },
  },
  {
    question: { en: "What do I look at?", de: "Was sehe ich hier?" },
    answer: {
      en: (
        <div>
          What you see is a knowledge graph, showing the last 10.000
          visitor-contributed <b>answers</b> presented as bullets. Each answer
          connects to its origin <b>question</b>, associated <b>topics</b>, and{" "}
          <b>keywords</b> classified by the AI.
        </div>
      ),
      de: (
        <div>
          Was Sie sehen, ist ein Wissensdiagramm, das die letzten 10.000 von
          Besuchern eingegebenen <b>Antworten</b> in Form von Kugeln anzeigt.
          Jede Antwort ist mit der ursprünglichen <b>Frage</b>, den zugehörigen{" "}
          <b>Themen</b> und den von der KI klassifizierten <b>Schlagwörtern</b>{" "}
          verbunden.
        </div>
      ),
    },
  },
  {
    question: { en: "How can I interact?", de: "Wie kann ich interagieren?" },
    answer: {
      en: (
        <>
          Tapping on elements in the graph will highlight the selected item
          along with its connected nodes. To unselect, simply tap anywhere.
          Additionally, you can reduce the number of answers by applying a
          filter in the top left corner. Use the bottom elements to change how
          the camera navigation works.
        </>
      ),
      de: (
        <>
          Wenn Sie auf Elemente im Diagramm tippen, wird das ausgewählte Element
          zusammen mit seinen verbundenen Knoten hervorgehoben. Um die Auswahl
          aufzuheben, tippen Sie einfach auf eine beliebige Stelle. Außerdem
          können Sie die Anzahl der Antworten reduzieren, indem Sie in der
          oberen linken Ecke einen Filter anwenden. Verwenden Sie die unteren
          Elemente, um die Funktionsweise der Kameranavigation zu ändern.
        </>
      ),
    },
  },
  {
    question: {
      en: "How is the graph organized?",
      de: "Wie ist der Graph angeordnet?",
    },
    answer: {
      en: (
        <>
          Within this forced directed graph, elements exert forces on one
          another, and through that find their position in space on their own.
          You can change these forces by changing the view and thus orchestrate
          the organization of elements into coherent, meaningful and readable
          clusters.
        </>
      ),
      de: (
        <>
          In diesem kräftebasierten Diagramm üben die Elemente Kräfte
          aufeinander aus, wodurch sie ihre Position im Raum selbständig finden.
          Sie können diese Kräfte verändern, indem Sie die Ansicht ändern und so
          die Organisation der Elemente in kohärenten, sinnvollen und lesbaren
          Clustern arrangieren.
        </>
      ),
    },
  },
  {
    question: {
      en: "How can I understand the clusters?",
      de: "Wie kann ich die Cluster verstehen?",
    },
    answer: {
      en: (
        <div>
          Reading clusters involves grasping forces in the forced directed
          graph: <br />
          <b>Attraction:</b> Strong connections pull elements closer, forming
          tight clusters, revealing relationships and coherent information.{" "}
          <br />
          <b>Repulsion:</b> Nodes with weaker connections exert a repulsive
          force, keeping unrelated elements separated. This ensures
          visualization clarity, prevents complexity, and enables focused
          exploration within the clusters.
        </div>
      ),
      de: (
        <div>
          Beim Lesen von Clustern geht es darum, die Kräfte in dem erzwungenen
          gerichteten Graphen zu erfassen: <br />
          <b>Attraktion:</b> Starke Verbindungen ziehen Elemente näher zusammen,
          bilden enge Cluster und offenbaren Beziehungen und kohärente
          Informationen. <br />
          <b>Abstoßung:</b> Knoten mit schwächeren Verbindungen üben eine
          abstoßende Kraft aus und halten nicht miteinander verbundene Elemente
          voneinander getrennt. Dies sorgt für eine klare Visualisierung,
          verhindert Komplexität und ermöglicht eine gezielte Erkundung
          innerhalb der Cluster.
        </div>
      ),
    },
  },
];

export default needHelpContent;
