// Evidence indexes
const EV_INDEX_EMF5 = 0;
const EV_INDEX_FINGERPRINTS = 1;
const EV_INDEX_WRITING = 2;
const EV_INDEX_SPIRITBOX = 3;
const EV_INDEX_FREEZING = 4;
const EV_INDEX_ORBS = 5;
const EV_INDEX_DOTS = 6;

// Evidence 
var g_aEvidence = [
    { index: EV_INDEX_EMF5,         label: "EMF Lvl 5",             icon: "imgs/emf.png" },
    { index: EV_INDEX_FINGERPRINTS, label: "Fingerprints",          icon: "imgs/finger.png" },
    { index: EV_INDEX_WRITING,      label: "Ghost Writing",         icon: "imgs/writing.png" },
    { index: EV_INDEX_SPIRITBOX,    label: "Spirit Box",            icon: "imgs/box.png" },
    { index: EV_INDEX_FREEZING,     label: "Freezing Temperatures", icon: "imgs/freeze.png" },
    { index: EV_INDEX_ORBS,         label: "Ghost Orbs",            icon: "imgs/orbs.png" },
    { index: EV_INDEX_DOTS,         label: "D.O.T.S Projector",     icon: "imgs/dots.png" }
];

// Ghosts
var g_aGhosts = [
    {
        type: "Spirit", 
        evidence: [EV_INDEX_EMF5, EV_INDEX_SPIRITBOX, EV_INDEX_WRITING], 
        strength: "None", 
        weakness: "Smudge Sticks"
    },
    {
        type:"Wraith", 
        evidence: [EV_INDEX_EMF5, EV_INDEX_SPIRITBOX, EV_INDEX_DOTS],  
        strength: "Walk through walls",  
        weakness: "Salt"
    },
    {
        type:"Phantom",  
        evidence: [EV_INDEX_SPIRITBOX, EV_INDEX_FINGERPRINTS, EV_INDEX_DOTS],  
        strength: "Drains sanity when seen",  
        weakness: "Photo Camera"
    },
    {
        type:"Mare",  
        evidence: [EV_INDEX_SPIRITBOX, EV_INDEX_ORBS, EV_INDEX_WRITING],  
        strength: "Darkness",  
        weakness: "Lights"
    },
    {
        type:"Banshee",  
        evidence: [EV_INDEX_FINGERPRINTS, EV_INDEX_ORBS, EV_INDEX_DOTS],  
        strength: "Targets specific person",  
        weakness: "Crucifix"
    },
    {
        type:"Poltergeist",  
        evidence: [EV_INDEX_SPIRITBOX, EV_INDEX_FINGERPRINTS, EV_INDEX_WRITING],  
        strength: "Moves objects",  
        weakness: "Empty Room"
    },
    {
        type:"Revenant",  
        evidence: [EV_INDEX_ORBS, EV_INDEX_WRITING, EV_INDEX_FREEZING],  
        strength: "Fast when hunting",  
        weakness: "Hiding"
    },
    {
        type:"Shade",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_WRITING, EV_INDEX_FREEZING],  
        strength: "Targets certain player",  
        weakness: "Many People"
    },
    {
        type:"Jinn",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FINGERPRINTS, EV_INDEX_FREEZING],  
        strength: "Fast",  
        weakness: "Breaker Off"
    },
    {
        type:"Demon",  
        evidence: [EV_INDEX_FINGERPRINTS, EV_INDEX_WRITING, EV_INDEX_FREEZING],  
        strength: "Hunting",  
        weakness: "Ouiji Board"
    },
    {
        type:"Yurei",  
        evidence: [EV_INDEX_ORBS, EV_INDEX_FREEZING, EV_INDEX_DOTS],  
        strength: "Drains sanity",  
        weakness: "Sanity Pills"
    },
    {
        type:"Oni",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FREEZING, EV_INDEX_DOTS],  
        strength: "Hunts with high activity",  
        weakness: "Easy to find"
    },
    {
        type:"Yokai",  
        evidence: [EV_INDEX_SPIRITBOX, EV_INDEX_ORBS, EV_INDEX_DOTS],  
        strength: "Talking near ghost angers it, likely to attack",  
        weakness: "Only hears nearby sounds when hunting"
    },
    {
        type:"Hantu",  
        evidence: [EV_INDEX_FINGERPRINTS, EV_INDEX_ORBS, EV_INDEX_FREEZING],  
        strength: "Moves faster in cold",  
        weakness: "Slower in warmth"
    },
    {
        type:"Myling",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FINGERPRINTS, EV_INDEX_WRITING],  
        strength: "Quieter when hunting",  
        weakness: "Frequently make paranormal sounds"
    },
    {
        type:"Goryo",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FINGERPRINTS, EV_INDEX_DOTS],  
        strength: "Only shows itself on camera when no one is nearby",  
        weakness: "Rarely seen from their place of death"
    },
    {
        type:"Onryo",  
        evidence: [EV_INDEX_SPIRITBOX, EV_INDEX_ORBS, EV_INDEX_FREEZING],  
        strength: "Extinguishing flame causes it to attack",  
        weakness: "Less likely to hunt when threatened"
    },
    {
        type:"Obake",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FINGERPRINTS, EV_INDEX_ORBS],  
        strength: "Rarely leaves evidence when interacting",  
        weakness: "Shapeshifting leaves behind unique evidence"
    },
    {
        type:"Raiju",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_ORBS, EV_INDEX_DOTS],  
        strength: "Can use electircal power to move faster",  
        weakness: "Easy to track when hunting, disrupts electrical"
    },
    {
        type:"Twins",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_SPIRITBOX, EV_INDEX_FREEZING],  
        strength: "Either twin can initiate hunt on prey",  
        weakness: "Interact with inventory at same time"
    }
];

// TODO: Evidence Options Buttons - Dynamically create buttons using the evidence option objects
// createEvidenceOptions();

// Sort Ghosts A - Z
g_aGhosts.sort((a,b) => (a.type > b.type) ? 1 : ((a.type < b.type) ? -1 : 0));

// UI Config
var bUseIcons = true; // Output

// Globals
var gGhostsDiv = document.getElementById("divGhosts");

// Index Matches Evidence Index (Boolean Toggles)
var gEvidenceSelected = [false,false,false,false,false,false,false];
var gEvidenceRuledOut = [false,false,false,false,false,false,false];

// On Load
checkEvidence();

// Trigger Evidence Check
function checkEvidence()
{
    var evidenceSelected = getSelected(gEvidenceSelected);
    var ghostList = getPossibleGhosts(evidenceSelected);
    
    // Sort by ruled out ghosts (false -> true)
    ghostList.sort((a, b) => a.ruledOut - b.ruledOut);

    // Impossible Evidence - Visually tell user when an evidence option is no longer a possibility. 
    // EXAMPLES: Confirmed EMF 5 Takes possibility of Orbs off the table, and vice versa
    // TODO: Optimize this code
    outputImpossible(impossibleEvidence(ghostList));

    outputToGhosts(ghostList);
}

function impossibleEvidence(ghostList)
{
    var evIndex = [0,0,0,0,0,0,0];
    var evidence = [];

    // Count for each occurance of evidence in possible ghost list
    for(var g = 0; g < ghostList.length; g++)
    {
        for(var e = 0; e < ghostList[g].evidence.length; e++)
        {
            evIndex[ghostList[g].evidence[e]]++;
        }
    }

    // If zero occurances, rule out evidence
    for(var i = 0; i < evIndex.length; i++)
    {
        //console.log(g_aEvidence[i].label + ": " + evIndex[i]); // Debug output
        if (evIndex[i] < 1)
        {
            evidence.push(true); // Push the index of the impossible evidences
        }
        else
        {
            evidence.push(false);
        }
    }

    return evidence;
}

function outputImpossible(impIndexes)
{
    var element = document.getElementById("evidenceOptions");
    for (var i = 0; i < impIndexes.length; i++)
    {
        var img = element.children[i].getElementsByTagName("img")[0];
        if (gEvidenceSelected[i] == false)
        {
            if (impIndexes[i] == true || gEvidenceRuledOut[i] == true) {
                img.className = "evidenceImpossible";
            }
            else if (impIndexes[i] == false && gEvidenceSelected[i] == false) {
                img.className = "evidence";
            }
        }
    }
}

// Toggle Selected
function evidenceSelected(btn, index)
{
    gEvidenceSelected[index] = !gEvidenceSelected[index];
    btn.className = (gEvidenceSelected[index] ? "evidenceSelected" : "evidence");
    checkEvidence();
}
function ruledOutEvidence(btn, index)
{
    gEvidenceRuledOut[index] = !gEvidenceRuledOut[index];
    btn.className = (gEvidenceRuledOut[index] ? "ruleOutSelected" : "ruleOut");
    checkEvidence();
}

// return array of checked elements
function getSelected(selections)
{
    var list = [];
    for (var i = 0; i < selections.length; i++)
        if (selections[i])
            list.push(i);
    return list;
}

// If evidence is on ruled out list return true
function containsEvidence(evidence, rolist)
{
    for (var i = 0; i < rolist.length; i++)
        if (evidence == rolist[i])
            return true;
    return false;
}

// Output the list of possible ghosts
function outputToGhosts(ghosts)
{
    gGhostsDiv.innerHTML = ""; // Clear the output area
    var selectedEvidence = getSelected(gEvidenceSelected);
    var ruledOutEvidence = getSelected(gEvidenceRuledOut); // Get the list of ruled out evidence
    for (var i = 0; i < ghosts.length; i++)
    {
        var el = document.createElement("div");
        el.innerHTML = "<strong>" + ghosts[i].type + "</strong><br>";
        var ghostRuledOut = false; // This will determine if we mark ghost as ruled out

        // Append each evidence
        for (var j = 0; j <= 2; j++)
        {
            var evidenceIndex = ghosts[i].evidence[j];

            // Is this evidence ruled out
            if (containsEvidence(evidenceIndex, ruledOutEvidence))
            {
                ghostRuledOut = true;
            }

            // Output as Text or Images
            if (bUseIcons)
            {
                var div = document.createElement("div");
                div.className = "tooltip";

                // Tool tip text
                var span = document.createElement("span");
                span.className = "tooltiptext";
                span.innerHTML = g_aEvidence[evidenceIndex].label;
                div.appendChild(span);

                // Image
                var img = document.createElement("img");
                img.className = (containsEvidence(evidenceIndex, selectedEvidence)) ? "selectedEvidenceImg" : "possibleImg";
                img.className = (containsEvidence(evidenceIndex, ruledOutEvidence)) ? "ruledOutImg" : img.className;
                img.src = g_aEvidence[evidenceIndex].icon; 
                div.appendChild(img);
                el.appendChild(div);
            }
            else
            { 
                var el2 = document.createElement("span");
                el2.className = (containsEvidence(evidenceIndex, selectedEvidence)) ? "selectedEvidence" : "";
                el2.innerHTML = g_aEvidence[evidenceIndex].label + "&nbsp&nbsp&nbsp&nbsp"; 
                el.appendChild(el2);
            }

        }

        // Descriptions - Only show when half the total ghosts are possible to avoid clutter
        if (ghosts.length <= Math.ceil(g_aGhosts.length / 2))
        {
            el.appendChild(document.createElement("br"));
            var spanStr = document.createElement("span");
            spanStr.innerHTML = "S: " + ghosts[i].strength;
            el.appendChild(spanStr);

            el.appendChild(document.createElement("br"));
            var spanWk = document.createElement("span");
            spanWk.innerHTML = "W: " + ghosts[i].weakness;
            el.appendChild(spanWk);
        }
        

        // Style if the ghost is ruled out
        if (ghostRuledOut)
            el.className = "ruledOut";
        else
            el.className = "possible";

        gGhostsDiv.appendChild(el);
    }
}

// Return array of Possible ghosts
function getPossibleGhosts(evidence)
{
    var ghosts = [];
    var ruledOutEvidence = getSelected(gEvidenceRuledOut);

    // For each ghost
    for (var gIndex = 0; gIndex < g_aGhosts.length; gIndex++)
    {
        var numMatches = 0;
        for (var i = 0; i < evidence.length; i++)
        {
            // Does the ghost have this evidence?
            if (g_aGhosts[gIndex].evidence[0] == evidence[i] ||
                g_aGhosts[gIndex].evidence[1] == evidence[i] ||
                g_aGhosts[gIndex].evidence[2] == evidence[i]){
                numMatches++;
            }
        }

        // Is ghost ruled out?
        if (containsEvidence(g_aGhosts[gIndex].evidence[0], ruledOutEvidence) ||
            containsEvidence(g_aGhosts[gIndex].evidence[1], ruledOutEvidence) ||
            containsEvidence(g_aGhosts[gIndex].evidence[2], ruledOutEvidence)){
            g_aGhosts[gIndex].ruledOut = true;
        }
        else {
            g_aGhosts[gIndex].ruledOut = false;
        }

        // If the num matches match the evidence entered, add to the list
        if (numMatches >= evidence.length)
            ghosts.push(g_aGhosts[gIndex]);
    }

    return ghosts;
}