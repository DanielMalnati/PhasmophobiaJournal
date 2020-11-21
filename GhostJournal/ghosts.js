// Evidence indexes
const EV_INDEX_EMF5 = 0;
const EV_INDEX_FINGERPRINTS = 1;
const EV_INDEX_WRITING = 2;
const EV_INDEX_SPIRITBOX = 3;
const EV_INDEX_FREEZING = 4;
const EV_INDEX_ORBS = 5;

// Output Mode
var bUseIcons = true;

// Ghosts
var g_aGhosts = [
    {
        type: "Spirit", 
        evidence: [EV_INDEX_FINGERPRINTS, EV_INDEX_WRITING, EV_INDEX_SPIRITBOX], 
        strength: "None", 
        weakness: "Smudge Sticks"
    },
    {
        type:"Wraith", 
        evidence: [EV_INDEX_FINGERPRINTS, EV_INDEX_FREEZING, EV_INDEX_SPIRITBOX],  
        strength: "Walk through walls",  
        weakness: "Salt"
    },
    {
        type:"Phantom",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FREEZING, EV_INDEX_ORBS],  
        strength: "Drains sanity when seen",  
        weakness: "Photo Camera"
    },
    {
        type:"Mare",  
        evidence: [EV_INDEX_FREEZING, EV_INDEX_ORBS, EV_INDEX_SPIRITBOX],  
        strength: "Darkness",  
        weakness: "Lights"
    },
    {
        type:"Banshee",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FINGERPRINTS, EV_INDEX_FREEZING],  
        strength: "Targets specific person",  
        weakness: "Crucifix"
    },
    {
        type:"Poltergeist",  
        evidence: [EV_INDEX_FINGERPRINTS, EV_INDEX_ORBS, EV_INDEX_SPIRITBOX],  
        strength: "Moves objects",  
        weakness: "Empty Room"
    },
    {
        type:"Revenant",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_FINGERPRINTS, EV_INDEX_WRITING],  
        strength: "Fast when hunting",  
        weakness: "Hiding"
    },
    {
        type:"Shade",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_ORBS, EV_INDEX_WRITING],  
        strength: "Targets certain player",  
        weakness: "Many People"
    },
    {
        type:"Jinn",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_ORBS, EV_INDEX_SPIRITBOX],  
        strength: "Fast",  
        weakness: "Breaker Off"
    },
    {
        type:"Demon",  
        evidence: [EV_INDEX_FREEZING, EV_INDEX_WRITING, EV_INDEX_SPIRITBOX],  
        strength: "Hunting",  
        weakness: "Ouiji Board"
    },
    {
        type:"Yurei",  
        evidence: [EV_INDEX_ORBS, EV_INDEX_FREEZING, EV_INDEX_WRITING],  
        strength: "Drains sanity",  
        weakness: "Sanity Pills"
    },
    {
        type:"Oni",  
        evidence: [EV_INDEX_EMF5, EV_INDEX_WRITING, EV_INDEX_SPIRITBOX],  
        strength: "Hunts with high activity",  
        weakness: "Easy to find"
    }
];

// Globals
var gGhostsDiv = document.getElementById("divGhosts");
// Index Matches Evidence Index
var gEvidenceSelected = [false,false,false,false,false,false];
var gEvidenceRuledOut = [false,false,false,false,false,false];

// On Load
checkEvidence();

// Trigger Evidence Check
function checkEvidence()
{
    var evidenceSelected = getSelected(gEvidenceSelected);
    var ghostList = getPossibleGhosts(evidenceSelected);
    outputToGhosts(ghostList);
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
            if (containsEvidence(evidenceIndex, ruledOutEvidence) && ghostRuledOut == false)
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
                span.innerHTML = evidenceToString(evidenceIndex);
                div.appendChild(span);

                // Image
                var img = document.createElement("img");
                img.className = (containsEvidence(evidenceIndex, selectedEvidence)) ? "selectedEvidenceImg" : "possibleImg";
                img.className = (containsEvidence(evidenceIndex, ruledOutEvidence)) ? "ruledOutImg" : img.className;
                img.src = evidenceImageSource(evidenceIndex); 
                div.appendChild(img);
                el.appendChild(div);
            }
            else
            { 
                var el2 = document.createElement("span");
                el2.className = (containsEvidence(evidenceIndex, selectedEvidence)) ? "selectedEvidence" : "";
                el2.innerHTML = evidenceToString(evidenceIndex) + "&nbsp&nbsp&nbsp&nbsp"; 
                el.appendChild(el2);
            }

        } // end inner for

        // Style if the ghost is ruled out
        if (ghostRuledOut)
            el.className = "ruledOut";
        else
            el.className = "possible";

        gGhostsDiv.appendChild(el);
    } // end outer for
    // If evidence is on ruled out list return true
    function containsEvidence(evidence, rolist)
    {
        for (var i = 0; i < rolist.length; i++)
            if (evidence == rolist[i])
                return true;
        return false;
    }
}

// Return array of Possible ghosts
function getPossibleGhosts(evidence)
{
    var ghosts = [];
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

        // If the num matches match the evidence entered, add to the list
        if (numMatches >= evidence.length)
            ghosts.push(g_aGhosts[gIndex]);
    }

    return ghosts;
}

// Convert index to String
function evidenceToString(index)
{
    var str = "";
    switch(index)
    {
        case EV_INDEX_EMF5:
            str = "EMF Lvl 5";
            break;
        case EV_INDEX_FINGERPRINTS:
            str = "Fingerprints";
            break;
        case EV_INDEX_WRITING:
            str = "Ghost Writing";
            break;
        case EV_INDEX_SPIRITBOX:
            str = "Spirit Box";
            break;
        case EV_INDEX_FREEZING:
            str = "Freezing Temperatures";
            break;
        case EV_INDEX_ORBS:
            str = "Ghost Orbs";
            break;
    }
    return str;
}

// Convert index to String
function evidenceImageSource(index)
{
    var src = "";
    switch(index)
    {
        case EV_INDEX_EMF5:
            src = "imgs/emf.png";
            break;
        case EV_INDEX_FINGERPRINTS:
            src = "imgs/finger.png";
            break;
        case EV_INDEX_WRITING:
            src = "imgs/writing.png";
            break;
        case EV_INDEX_SPIRITBOX:
            src = "imgs/box.png";
            break;
        case EV_INDEX_FREEZING:
            src = "imgs/freeze.png";
            break;
        case EV_INDEX_ORBS:
            src = "imgs/orbs.png";
            break;
    }
    return src;
}
