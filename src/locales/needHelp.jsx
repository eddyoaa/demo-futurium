const needHelpContent = [
  {
    question: { en: "What is this about?", de: "Worum geht es hier?" },
    answer: {
      en: (
        <>
          This installation by Studio Brüll revolves around leveraging data for
          more informed debates. In the context of democracy, data plays an
          increasingly vital role, serving as the foundation for discussions and
          decisions. The station collects your ideas and opinions, automatically
          analyzes them, and presents them in a knowledge graph.
        </>
      ),

      de: (
        <>
          Bei dieser Installation von Studio Brüll geht es um die Nutzung von
          Daten für besser informierte Debatten. Im Rahmen der Demokratie
          spielen Daten eine immer wichtigere Rolle und dienen als Grundlage für
          Diskussionen und Entscheidungen. Die Station sammelt Ihre Ideen und
          Meinungen, analysiert sie automatisch und stellt sie in einem
          Wissensgraphen dar.
        </>
      ),
    },
  },

  {
    question: {
      en: "How does that concern me?",
      de: "Was hat das mit mir zu tun?",
    },
    answer: {
      en: (
        <>
          The idea is to enable visitors to discover information and connections
          within the data, thereby making a playful application of their own
          data literacy tangible.
        </>
      ),

      de: (
        <>
          Die Idee besteht darin, Besuchern zu ermöglichen, Informationen und
          Verbindungen innerhalb der Daten zu entdecken und dabei einen
          spielerischen Umgang mit der eigenen Datenkompetenz erlebbar zu
          machen.
        </>
      ),
    },
  },
  {
    question: { en: "What do I look at?", de: "Was sehe ich hier?" },
    answer: {
      en: (
        <div>
          What you see is a knowledge graph, showing the last 5.000
          visitor-contributed <b>answers</b> presented as bullets. Each answer
          connects to its origin <b>question</b>, associated <b>topics</b>, and{" "}
          <b>keywords</b> classified by the AI.
        </div>
      ),
      de: (
        <div>
          Was Sie sehen, ist ein Wissensgraph, welcher die letzten 5.000 von
          Besuchern eingegebenen <b>Antworten</b> in Form von Kugeln anzeigt.
          Jede Antwort ist mit der ursprünglichen <b>Frage</b>, und den von der
          KI klassifizierten <b>Themen</b> und <b>Schlagwörtern</b> verbunden.
        </div>
      ),
    },
  },
  {
    question: {
      en: "How can I use the graph?",
      de: "Wie kann ich den Graphen benutzen?",
    },
    answer: {
      en: (
        <>
          Tapping on elements in the graph will highlight the selected item
          along with its connected nodes. To unselect, simply tap anywhere.
          Additionally, you can reduce the number of answers by applying a
          filter in the top left corner. Use the bottom elements to change how
          the navigation works.
        </>
      ),
      de: (
        <>
          Wenn Sie auf Elemente im Graphen tippen, wird das ausgewählte Element
          zusammen mit seinen verbundenen Knoten hervorgehoben. Um die Auswahl
          aufzuheben, tippen Sie auf den Hintergrund. Außerdem können Sie die
          Anzahl der Antworten reduzieren, indem Sie in der oberen linken Ecke
          einen Filter anwenden. Verwenden Sie die unteren Elemente, um die Art
          der Navigation zu ändern.
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
          In diesem gerichteten Graphen üben die Elemente Kräfte aufeinander
          aus, wodurch sie ihre Position im Raum selbständig finden. Sie können
          diese Kräfte verändern, indem Sie die Ansicht ändern und so die
          Organisation der Elemente in kohärenten, sinnvollen und lesbaren
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
          When reading clusters, the focus is on understanding the forces in the
          graph. The principle is that strong connections pull elements closer
          together, forming tight clusters and revealing relationships and
          coherent information.
        </div>
      ),
      de: (
        <div>
          Beim Lesen von Clustern geht es darum, die Kräfte im Graphen zu
          verstehen. Dabei gilt: Starke Verbindungen ziehen Elemente näher
          zusammen, bilden enge Cluster und offenbaren Beziehungen und kohärente
          Informationen.
        </div>
      ),
    },
  },
];

export default needHelpContent;
